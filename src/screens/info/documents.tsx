import React from 'react';
import {ScrollView} from 'react-native';
import {documentStyle} from '../../assets';
import {InfoPlaceHolder, NoData} from '../../common/ui';
import Document from './document';

const Documents = ({
  loading,
  documents,
}: {
  loading: boolean;
  documents: any;
}) => {
  return (
    <ScrollView
      style={documentStyle.documentsContainer}
      contentContainerStyle={documents && documentStyle.center}
      showsVerticalScrollIndicator={false}>
      {!documents?.length ? (
        <NoData title="documents" icon={''} />
      ) : (
        documents?.map((item: any, index) => (
          <Document
            key={index}
            type={
              item.documentPath.split('.')[
                item.documentPath.split('.').length - 1
              ]
            }
            title={item.name}
            source={item.documentPath}
            index={index}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Documents;
