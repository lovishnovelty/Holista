import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import {color, font, otpStyle as os, app_theme} from '../../../assets';
import {RegularText, Button} from '../.././../common/ui';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {checkEmpty} from '../../../utils';

const OTPComponent = (props: any) => {
  const params = props.params?.code
    ? props.params.code.split('_')
    : [props.phone];
  const [otp, setOtp] = useState<string>(params[1] ?? '');

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: normalize(40),
        }}>
        <View>
          <RegularText
            title="One Time Password"
            style={{
              fontFamily: font.RobotoLight,
              fontSize: normalize(12),
            }}
          />
          <RegularText
            title={`Please enter the verification code sent to your phone ${params[0]}`}
            style={{
              color: color.textSmall,
              fontSize: normalize(14),
              marginTop: normalize(15),
            }}
          />
          <OTPInputView
            style={os.codeView}
            pinCount={6}
            code={otp}
            onCodeChanged={(code) => setOtp(code)}
            autoFocusOnLoad
            codeInputFieldStyle={os.boxStyle}
          />
          {props.error && (
            <RegularText
              title={props.error}
              style={{color: color.red, marginTop: normalize(15)}}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RegularText
              title="Didn't receive code?"
              style={{
                color: color.pressableText,
                fontSize: normalize(16),
                marginTop: normalize(30),
              }}
            />
            <TouchableOpacity
              onPress={(val) => {
                props.handleChange('code')(otp);
                props.submitForm(val), props.handleChange('action')('resend');
                !props.errors.phone && props.values.phone !== '' && setOtp('');
              }}>
              <RegularText
                title=" Resend"
                style={{
                  color: app_theme.primary_color,
                  marginTop: normalize(30),
                  marginLeft: normalize(2),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: normalize(20)}}>
          <Button
            title="Submit"
            spinner={props.loading}
            buttonStyle={{marginTop: normalize(20)}}
            onPress={(val) => {
              props.handleChange('code')(otp);
              props.submitForm(val), props.handleChange('action')('submit');
            }}
          />
        </View>
      </View>
    </>
  );
};

export {OTPComponent};
