import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {withTheme} from 'react-native-elements';
import {commonStyle, idCardStyle as ic} from '../../assets';
import {Wrapper} from '../../common/ui';
import {NavHeader} from '../../common/ui/navHeader';
import Card from './card';

const IdcardScreen = () => {
  const [isDownload, setIsDownload] = useState<boolean>(false);
  // const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        title="Member ID Card"
        style={commonStyle.justifyContentCenter}
        hideLeftIcon
        rightIcon="download"
        rightIconSize={30}
        rightIconColor="#3C9584"
        rightIconPress={() => setIsDownload(true)}
      />
      <ScrollView style={ic.container} showsVerticalScrollIndicator={false}>
        <Card
          isDownload={isDownload}
          setIsDownload={setIsDownload}
          // setLoading={setLoading}
        />
      </ScrollView>
    </Wrapper>
  );
};

const IdCard = withTheme(IdcardScreen);

export {IdCard};
