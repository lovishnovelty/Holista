import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {documentStyle} from '../../assets';
import {InfoPlaceHolder, NoData} from '../../common/ui';
import Link from './link';

const Links = ({loading, links}: {loading: boolean; links: any[]}) => {
  return (
    <ScrollView
      style={documentStyle.documentsContainer}
      contentContainerStyle={links && documentStyle.center}
      showsVerticalScrollIndicator={false}>
      {!links ? (
        <InfoPlaceHolder type="link" />
      ) : links && links.length === 0 ? (
        <NoData title="Links" />
      ) : (
        links &&
        links.map((item, index) => (
          <Link key={index} title={item.name} link={item.documentPath} />
        ))
      )}
    </ScrollView>
  );
};

export default Links;
