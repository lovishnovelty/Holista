import React, {useEffect, useState} from 'react';
import {View, Linking} from 'react-native';

import withTheme from '../../../hoc/withTheme';
import {communicationStyle as cs} from '../../../assets';
import {getLocalData, normalize} from '../../../utils';
import {Button, RegularText} from '../../../common/ui';

const TelemedicineScreen = () => {
  const [telemedicineLink, setTelemedicineLink] = useState<any>();
  useEffect(() => {
    getTelemedicineLink();
  }, []);

  const getTelemedicineLink = async () => {
    const link = await getLocalData('telemedicineLink');
    setTelemedicineLink(link);
  };

  return (
    <View style={[cs.telemedicineWrapper]}>
      {telemedicineLink ? (
        <Button
          title="Connect with your Doctor"
          onPress={async () => {
            await Linking.openURL(telemedicineLink);
          }}
          buttonWrapper={cs.buttonWrapper}
          buttonStyle={cs.button}
          buttonTextStyle={[cs.buttonText, {paddingVertical: normalize(10)}]}
        />
      ) : (
        <View style={cs.telemedicineText}>
          <RegularText
            title={'Telemedicine link not available. Please contact support.'}
          />
        </View>
      )}
    </View>
  );
};

const Telemedicine = withTheme(TelemedicineScreen);
export {Telemedicine};
