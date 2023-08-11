import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform, Linking} from 'react-native';
import {
  Wrapper,
  Header,
  RegularText,
  Button,
  DropDown,
  FooterText,
} from '../../common/ui';
import {color, font, registerStyle as rs} from '../../assets';
import {normalize} from '../../utils';
import {useFetch} from '../../hooks';

const mapState = (data: any) => {
  return data.map((item: any) => {
    return {
      id: item.id,
      label: item.state,
      value: item.state,
      link: item.link,
    };
  });
};

const Register = () => {
  const [state, setState] = useState<any>({state: null, link: null});
  const {result, doRequest} = useFetch();
  const options = result && mapState(result);

  useEffect(() => {
    const url = '/api/member-info/enrollments';
    const res = doRequest(url);
    console.log(res, '-----/api/member-info/enrollments-----');
  }, []);

  const onChange = (val: any) => {
    setState({state: val.value, link: val.link});
  };

  return (
    <Wrapper>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <Header top={20} />
        <RegularText title="Member Enrollment" style={rs.enroll} />
        <View style={rs.body}>
          {options && (
            <View>
              <DropDown
                onChange={onChange}
                options={options}
                placeholder="Select a state"
              />
              <Button
                title="Enrollment"
                top={30}
                onPress={async () => {
                  await Linking.openURL(state.link);
                }}
              />
              <RegularText
                title="You will be redirected to our registration page. You will receive activation link in text message."
                style={{
                  color: color.lightBlack,
                  marginTop: normalize(30),
                  fontSize: normalize(14),
                }}
              />
            </View>
          )}
          <FooterText type="login" />
        </View>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export {Register};
