import React, {useState, useEffect, useContext} from 'react';
import {View, Platform, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthContext} from '../../context';
import {
  Button,
  Input,
  Wrapper,
  RegularText,
  Header,
  CustomCheckBox,
  FooterText,
} from '../../common/ui';
import {
  navigate,
  storeLocalData,
  isBiometricAvailable,
  getLocalData,
  biometricPrompt,
  normalize,
  setToken,
  getAcessToken,
  removeLocalData,
} from '../../utils';

import {FormInterface} from '../../interface';
import {loginSchema} from '../../utils/validation';
import {loginStyle as ls, app_theme, theme, color} from '../../assets';
import {getRequest, postRequest, patchRequest} from '../../services/request';

const Login = () => {
  const dispatch = useDispatch();
  const {dispatch: dispatchAuth} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);
  const initialValues = {
    userName: '',
    password: '',
    rememberMe: false,
  };

  useEffect(() => {
    const checkDisclaimer = async () => {
      const isDisclaimerViewed = await getLocalData('isDisclaimerViewed');
      console.log(isDisclaimerViewed, 'isDisclaimerViewed');
    };
    checkDisclaimer();
  }, []);

  useEffect(() => {
    async function isBiometricSetup() {
      try {
        const biometricSetup: any = await getLocalData('biometricSetup');

        if (biometricSetup) {
          let biometric: any = await isBiometricAvailable();
          setBiometricType(biometric);
          biometricLogin();
        } else {
          setBiometricType('');
        }
      } catch (error) {}
    }
    isBiometricSetup();
  }, []);

  const biometricLogin = async () => {
    const accessToken = await getAcessToken();
    try {
      if (!accessToken) {
        const result = await biometricPrompt();
        if (result) {
          const userData: FormInterface | any = await getLocalData('userCred');
          const body = JSON.parse(userData);

          let user: any = await getLocalData('biometricSetup');
          if (user) {
            onSubmit(body);
          }
        }
      }
    } catch (e) {}
  };

  const updateToken = async (id: number) => {
    try {
      const token = await messaging().getToken();
      const deviceId = DeviceInfo.getUniqueId();
      const getTokenUrl = `/api/user/firebase-tokens/${id}`;
      const url = '/api/user/firebase-token';
      const tokenList: any = await getRequest(getTokenUrl);
      console.log(tokenList, '----tokenList----');

      if (tokenList?.tokens.includes(token)) {
        return;
      } else {
        await storeLocalData('notificationToken', token);
        const body = {
          deviceId,
          token,
        };
        console.log(body, '---body----');

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        const res = await patchRequest(url, body);
        console.log(res, '----/api/user/firebase-token-----');
      }
    } catch (error) {}
  };

  const onSubmit = async (values: FormInterface) => {
    try {
      setLoading(true);
      const url = '/api/auth/login';
      const deviceId = DeviceInfo.getUniqueId();
      const body = {
        ...values,
        rememberMe: isChecked,
        source: 'phone',
        deviceId,
        deviceType: Platform.OS,
      };

      const biometricSetup = await getLocalData('biometricSetup');
      const res: any = await postRequest(url, body);

      await setToken(res.data.token, res.data.refreshToken);
      const userData: any = await getRequest(`/api/users/${+res.data.user.id}`);

      if (
        biometricSetup &&
        JSON.parse(biometricSetup).data.userSetting.userId !==
          userData.data.userSetting.userId
      ) {
        await removeLocalData('biometricSetup');
      }

      await updateToken(res.data.user.id);
      await storeLocalData('user', JSON.stringify(userData));
      await storeLocalData(
        'userCred',
        JSON.stringify({...body, id: res.data.user.id}),
      );
      if (res.data.user.telemedicineLink) {
        await storeLocalData(
          'telemedicineLink',
          res.data.user.telemedicineLink,
        );
      }
      if (userData.data.userSetting.disclaimerAck) {
        await storeLocalData('disclaimer', 'true');
      }

      dispatchAuth({
        type: 'LOAD_DISCLAIMER',
        payload: userData.data.userSetting.disclaimerAck ? false : true,
      });
      dispatch({
        type: 'SIGN_IN',
        payload: {
          token: res.data.token,
          user: userData,
        },
      });
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={
          Platform.OS === 'ios' ? normalize(180) : normalize(120)
        }
        extraHeight={Platform.OS === 'android' ? normalize(100) : normalize(50)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'none'}
        contentContainerStyle={{flexGrow: 1}}>
        <Header top={theme.size.xxs} />
        <RegularText title="Member Login" style={ls.member} />
        <View style={{marginTop: normalize(30)}}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={values => onSubmit(values)}>
            {({values, errors, touched, handleChange, submitForm}) => (
              <>
                <Input
                  placeholder={'Email, Phone or Subscriber Number'}
                  onChangeText={text => {
                    handleChange('userName')(text);
                    error && setError(null);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.userName}
                  error={errors.userName && touched.userName && errors.userName}
                  touched={touched}
                />
                <View style={{marginTop: normalize(theme.size.xxs)}} />
                <View style={ls.password}>
                  <Input
                    placeholder="**********"
                    secureTextEntry={togglePassword ? false : true}
                    onChangeText={text => {
                      handleChange('password')(text);
                      error && setError(null);
                    }}
                    value={values.password}
                    error={
                      errors.password && touched.password && errors.password
                    }
                    touched={touched}
                  />
                  <TouchableOpacity
                    style={ls.toggleIcon}
                    onPress={() => setTogglePassword(!togglePassword)}>
                    <Icon name={togglePassword ? 'eye' : 'eye-off'} size={20} />
                  </TouchableOpacity>
                </View>
                {error && (
                  <View style={{marginTop: normalize(theme.size.base)}}>
                    <RegularText title={error} style={ls.error} />
                  </View>
                )}
                <View style={ls.rememberMeSection}>
                  <TouchableOpacity
                    style={ls.rememberView}
                    onPress={() => setIsChecked(prev => !prev)}>
                    <CustomCheckBox
                      isSelected={isChecked}
                      onValueChange={() => setIsChecked(prev => !prev)}
                    />
                    <RegularText
                      title="Remember Me"
                      style={{marginLeft: normalize(theme.size.xxxs)}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigate('Verification')}>
                    <Text
                      style={[
                        ls.defaultTextStyle,
                        ls.rememberMeSection_title,
                        {color: app_theme.primary_color},
                      ]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button
                  title="Sign In"
                  onPress={() => submitForm()}
                  buttonStyle={ls.signIn}
                  spinner={loading}
                  top={32}
                />
              </>
            )}
          </Formik>
        </View>
        <View style={ls.footer}>
          {biometricType ? (
            <TouchableOpacity
              onPress={() => biometricLogin()}
              style={ls.biometric}>
              <Icon name="fingerprint" size={20} />
              <RegularText
                title="Use Touch ID"
                style={{marginLeft: normalize(theme.size.xxxs)}}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      <FooterText type="register" />
      <Text style={{textAlign: 'right', fontSize: theme.size.xxs}}>
        Version {DeviceInfo.getVersion()}
      </Text>
    </Wrapper>
  );
};

export {Login};
