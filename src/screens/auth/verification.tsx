import React, {useEffect, useState} from 'react';
import {View, Platform, Keyboard} from 'react-native';
import {Formik} from 'formik';
import {verificationStyle as vs} from '../../assets';
import {
  Wrapper,
  RegularText,
  Header,
  Button,
  FooterText,
} from '../../common/ui';
import {navigate, normalize, snackBarBottom} from '../../utils';
import {verificationSchema} from '../../utils/validation';
import {FormInterface} from '../../interface';
import {FormComponent, OTPComponent} from '../../components';
import {usePost} from '../../hooks';
import {getRequest} from '../../services/request';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Verification = (props: any) => {
  const {result, doRequest, error} = usePost();
  const [loading, setLoading] = useState(false);
  const [sendPressed, setSendPressed] = useState(false);
  const [phone, setPhone] = useState<any>(0);

  const onSubmit = (values: FormInterface) => {
    if (values.action === 'resend') {
      const url = `/api/users/resend-otp/${values.phone}`;
      getRequest(url)
        .then((data) => {
          if (data.success === true) {
            snackBarBottom(data.data.message, 'success', true);
          } else if (data.success === false) {
            snackBarBottom('Unable to send OTP.', 'error', true);
          }
          Keyboard.dismiss();
          setSendPressed(true);
        })
        .catch((err) => {
          setSendPressed(false);
          snackBarBottom(
            err.response?.data?.message ?? 'Unable to send OTP.',
            'error',
            true,
          );
        });
    } else {
      setLoading(true);
      const url = '/api/users/verify-otp';
      doRequest(url, values, (data) => {
        if (!data.success) {
          snackBarBottom('Unable to send OTP.', 'error', true);
          return;
        }
        setSendPressed(true);
      });
      setPhone(values.phone);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && result.message === 'OTP code verified.') {
      snackBarBottom(result.message, 'success', true);
      setLoading(false);
      navigate('Confirmation', {phone: phone});
    } else if (result && result.message) {
      snackBarBottom(result.message, 'error', true);
      setLoading(false);
      Keyboard.dismiss();
    }
  }, [result]);

  return (
    <Wrapper>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={
          Platform.OS === 'ios' ? normalize(180) : normalize(200)
        }
        extraHeight={
          Platform.OS === 'android' ? normalize(140) : normalize(150)
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'none'}
        contentContainerStyle={{flexGrow: 1}}>
        <Header top={9} />
        <RegularText
          title={
            props.route.params?.code
              ? 'Account Verification'
              : 'Forgot Password'
          }
          style={vs.password}
        />
        <View style={vs.main}>
          <Formik
            initialValues={{
              code: '',
              phone: '',
              action: '',
            }}
            validationSchema={verificationSchema}
            onSubmit={onSubmit}>
            {({handleChange, values, errors, touched, submitForm}) => (
              <>
                <FormComponent
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  maxLength={10}
                />
                {sendPressed || props.route.params?.code ? (
                  <OTPComponent
                    params={props.route?.params}
                    phone={phone}
                    values={values}
                    submitForm={submitForm}
                    handleChange={handleChange}
                    errors={errors}
                    loading={loading}
                    error={error ?? null}
                  />
                ) : (
                  <Button
                    title="Send OTP"
                    buttonStyle={{marginTop: normalize(50)}}
                    onPress={() => {
                      values.phone === ''
                        ? handleChange('phone')('')
                        : !errors?.phone &&
                          onSubmit({...values, action: 'resend'}),
                        setPhone(values.phone);

                      Keyboard.dismiss();
                    }}
                  />
                )}
              </>
            )}
          </Formik>
        </View>
        <FooterText type="enroll" />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export {Verification};
