import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import {desclamierStyle as ds} from '../../assets/styles/common/ui/desclamier.styles';
import {putRequest} from '../../services/request';
import {normalize, storeLocalData} from '../../utils';
import {Button} from './button';
import {Icon} from './icon';
import {RegularText} from './regularText';
import {useDispatch, useSelector} from 'react-redux';
import {color, checkBoxStyle as cs} from '../../assets';
import CheckBox from 'react-native-check-box';

const Desclamier = (props: any) => {
  const [disclaimerAck, setDisclaimerAck] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.userData.data);
  const isAck = user.userSetting.disclaimerAck;
  const dispatch = useDispatch();
  useEffect(() => {
    setDisclaimerAck(isAck);
  }, []);

  const onSubmit = async () => {
    try {
      await storeLocalData('isDisclaimerViewed', 'viewed');

      if (disclaimerAck && isAck) return props.onPress(false);
      setLoading(true);
      const url = `/api/users/${user.id}/settings`;
      await putRequest(url, {disclaimerAck: disclaimerAck});
      setLoading(false);
      dispatch({
        type: 'SET_DISCLAIMER',
        payload: true,
      });
      props.onPress(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal isVisible={props.visible} style={ds.main}>
      <View
        style={{
          flex: 0.3,
        }}
      />
      <View style={ds.body}>
        <View style={ds.wrapper}>
          <View style={ds.header}>
            <RegularText title="Disclaimer" style={ds.font} />
            <TouchableOpacity onPress={() => props.onPress()}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
          <ScrollView style={ds.scrollView}>
            <RegularText
              style={ds.text}
              title="The information, including but not limited to, text, graphics, images and other material contained on this website are for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this website."
            />
            <RegularText
              style={ds.text}
              title="A quote of benefits and/or authorization does not guarantee payment or verify eligibility. Payment of benefits are subject to all terms, conditions, limitations, and exclusions of the member’s contract at the time of service."
            />
            <RegularText
              style={ds.text}
              title="I understand that my health insurance company may deny or limit payment for the services identified, for any reason (stated or not). If my health insurance company denies payment, I agree to be personally and fully responsible for payment. I also understand that if my health insurance company does make payment for services, I will be responsible for any co-payment, deductible, or coinsurance that applies."
            />
            <View style={ds.checkBox}>
              <CheckBox
                style={{flex: 1, padding: normalize(10)}}
                onClick={() => {
                  setDisclaimerAck(!disclaimerAck);
                }}
                isChecked={disclaimerAck}
                checkBoxColor={disclaimerAck ? color.green : color.border}
                rightText="I understand, don't show again"
                disabled={disclaimerAck && isAck}
                rightTextStyle={{marginLeft: normalize(10)}}
              />
            </View>
          </ScrollView>
          <View style={ds.buttonWrapper}>
            <Button
              buttonTextStyle={!disclaimerAck && {color: color.black}}
              disable={!disclaimerAck && !isAck ? true : false}
              spinner={loading}
              title={disclaimerAck && isAck ? 'Ok' : 'I Agree'}
              onPress={onSubmit}
              buttonStyle={!disclaimerAck ? ds.buttonDisable : ds.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {Desclamier};
