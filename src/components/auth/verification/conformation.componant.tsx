import React, {useState} from 'react';
import {View} from 'react-native';
import {Input} from '../../../common/ui';
import {color, theme, verificationStyle as vs} from '../../../assets';
import {VerificationInterface} from '../../../interface';
import {Button, RegularText} from '../../../common/ui';
import {normalize} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConformationComponent = ({
  values,
  errors,
  touched,
  handleChange,
  submitForm,
  loading,
  ApiError,
  setApiError,
}: VerificationInterface) => {
  const [initial, setInitial] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: normalize(15),
      }}>
      <View>
        <Input
          placeholder="Password"
          onChangeText={(val) => {
            handleChange('password')(val),
              setApiError({
                past: false,
                personal: false,
                global: false,
              }),
              setInitial(false);
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          value={values.password}
        />
        <View style={{marginTop: normalize(10)}} />
        <Input
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(val) => {
            handleChange('confirmPassword')(val),
              setApiError({
                past: false,
                personal: false,
                global: false,
              }),
              setInitial(false);
          }}
          value={values.confirmPassword}
        />
        <View
          style={{
            marginTop: normalize(10),
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: normalize(20),
          }}>
          <RegularText
            title="Rules to follow while changing passwords"
            style={{fontSize: normalize(16), marginTop: normalize(15)}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(15),
            }}>
            <Icon
              name={
                errors.password
                  ? 'alert-circle-outline'
                  : 'check-circle-outline'
              }
              color={
                initial
                  ? color.pressableText
                  : errors.password
                  ? color.red
                  : color.green
              }
            />
            <RegularText
              title="Password must be at least 8 character including at least one Uppercase, Lowercase, Special character i.e #@! and a number. Spaces are not allowed in password"
              style={{
                color: initial
                  ? color.pressableText
                  : errors.password
                  ? color.red
                  : color.green,
                marginLeft: normalize(16.5),
                textAlign: 'left',
                fontSize: normalize(theme.size.xs),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(5),
            }}>
            <Icon
              name={
                errors.confirmPassword
                  ? 'alert-circle-outline'
                  : 'check-circle-outline'
              }
              color={
                initial
                  ? color.pressableText
                  : errors.confirmPassword
                  ? color.red
                  : color.green
              }
            />
            <RegularText
              title="Passwords do not match."
              style={{
                color: initial
                  ? color.pressableText
                  : errors.confirmPassword
                  ? color.red
                  : color.green,
                marginLeft: normalize(16.5),

                textAlign: 'left',
                fontSize: normalize(theme.size.xs),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(5),
              alignItems: 'flex-start',
            }}>
            <Icon
              name={
                ApiError.personal
                  ? 'alert-circle-outline'
                  : 'check-circle-outline'
              }
              color={ApiError.personal ? color.red : color.pressableText}
            />
            <RegularText
              title="Password should not include personal information, such as name of birth date"
              style={{
                color: ApiError.personal ? color.red : color.pressableText,
                marginLeft: normalize(16.5),
                textAlign: 'left',
                fontSize: normalize(theme.size.xs),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(5),
              alignItems: 'flex-start',
            }}>
            <Icon
              name={
                ApiError.global
                  ? 'alert-circle-outline'
                  : 'check-circle-outline'
              }
              color={ApiError.global ? color.red : color.pressableText}
            />
            <RegularText
              title="Password should not include global banned password"
              style={{
                color: ApiError.global ? color.red : color.pressableText,
                marginLeft: normalize(16.5),
                textAlign: 'left',
                fontSize: normalize(theme.size.xs),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(5),
              alignItems: 'flex-start',
            }}>
            <Icon
              name={
                ApiError.past ? 'alert-circle-outline' : 'check-circle-outline'
              }
              color={ApiError.past ? color.red : color.pressableText}
            />
            <RegularText
              title="New password cannot be same as any of the previous six passwords"
              style={{
                color: ApiError.past ? color.red : color.pressableText,
                marginLeft: normalize(16.5),
                textAlign: 'left',
                fontSize: normalize(theme.size.xs),
              }}
            />
          </View>
        </View>
        <Button
          title="Submit"
          onPress={submitForm}
          top={normalize(20)}
          spinner={loading}
        />
      </View>
    </View>
  );
};

export {ConformationComponent};
