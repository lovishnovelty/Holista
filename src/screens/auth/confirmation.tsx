import React, {useState, useContext} from 'react';
import {View, Platform} from 'react-native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Header, RegularText, Wrapper} from '../../common/ui';
import {confirmationSchema} from '../../utils/validation';
import {ConformationComponent} from '../../components';
import {
  navigate,
  normalize,
  removeLocalData,
  setToken,
  showToast,
  storeLocalData,
} from '../../utils';
import {confirmationStyle} from '../../assets';
import {ConfirmationInterface} from '../../interface';
import {BASE_URI} from '../../api/uri';
import {getRequest, postRequest} from '../../services/request';
import {useDispatch} from 'react-redux';
import {AuthContext} from '../../context';

const Confirmation = ({route: {params}}: {route: {params: any}}) => {
  const {dispatch: dispatchAuth} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [ApiError, setApiError] = useState({
    past: false,
    personal: false,
    global: false,
  });
  const dispatch = useDispatch();

  const onSubmit = (values: ConfirmationInterface) => {
    setLoading(true);
    const url = '/api/auth/set-password';
    const postbody = {
      password: values.password,
      phone: params.phone.toString(),
    };
    fetch(`${BASE_URI}${url}`, {
      method: 'post',
      body: JSON.stringify(postbody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async data => {
        if (data.message) {
          data.message === 'Password has already been used previously.'
            ? setApiError(prevstate => ({...prevstate, past: true}))
            : showToast({
                type: 'error',
                text1: data?.message,
              });
        } else if (data.data.message) {
          data.data.message === 'Contains personal info'
            ? setApiError(prevstate => ({...prevstate, personal: true}))
            : data.data.message === 'Password combination contains banned word.'
            ? setApiError(prevstate => ({...prevstate, global: true}))
            : showToast({
                type: 'error',
                text1: data?.data?.message,
              });
        } else if (data.data) {
          showToast({
            type: 'success',
            text1: 'Successfully set the password, Logging in.',
          });
          const url = '/api/auth/login';
          const body = {
            password: postbody.password,
            userName: postbody.phone,
            source: 'phone',
            rememberMe: false,
          };
          try {
            const res: any = await postRequest(url, body);
            await setToken(res.data.token, res.data.refreshToken);
            const userData: any = await getRequest(
              `/api/users/${+res.data.user.id}`,
            );

            if (userData.data.userSetting.disclaimerAck)
              await storeLocalData('disclaimer', 'true');

            dispatchAuth({
              type: 'LOAD_DISCLAIMER',
              payload: userData.data.userSetting.disclaimerAck ? false : true,
            });

            await removeLocalData('biometricSetup');
            await storeLocalData('user', JSON.stringify(userData));
            await storeLocalData(
              'userCred',
              JSON.stringify({...body, id: res.data.user.id}),
            );
            dispatch({
              type: 'SIGN_IN',
              payload: {token: res.data.token, user: userData},
            });
            navigate('Main');
          } catch (error) {
            console.log(error.response.data);
          }
        }
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={
          Platform.OS === 'ios' ? normalize(180) : normalize(170)
        }
        extraHeight={
          Platform.OS === 'android' ? normalize(140) : normalize(150)
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'none'}
        contentContainerStyle={confirmationStyle.contentContainer}>
        <Header top={10} />
        <RegularText
          title="Set Account Password"
          style={confirmationStyle.text}
        />
        <View style={confirmationStyle.main}>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validateOnBlur={true}
            validationSchema={confirmationSchema}
            onSubmit={onSubmit}>
            {({handleChange, values, errors, touched, submitForm}) => (
              <ConformationComponent
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                submitForm={submitForm}
                loading={loading}
                ApiError={ApiError}
                setApiError={setApiError}
              />
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export {Confirmation};
