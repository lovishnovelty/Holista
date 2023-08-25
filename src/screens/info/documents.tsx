import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {documentStyle, milestoneStyle as ms} from '../../assets';
import {Icon, Input, NoData} from '../../common/ui';
import Document from './document';
import {useAsyncState} from '../../hooks';

const Documents = ({
  loading,
  documents,
}: {
  loading: boolean;
  documents: any;
}) => {
  const inputRef = useRef('');
  const [searchText, setSearchText] = useState<string>('');
  const [data, setData] = useAsyncState({
    data: [],
    tempData: [],
    loading: true,
    message: 'No document available',
  });
  useEffect(() => {
    setData({
      data: documents,
      tempData: documents,
      loading: false,
      message: 'No document available',
    });
  }, []);
  const onChangeSearch = (text: string) => {
    const result = data;
    setSearchText(text);
    let temp = [...documents];
    if (text && !/\\/.test(text)) {
      const filteredData = temp.filter((item: any) =>
        item.name.toLowerCase().match(text.toLowerCase()),
      );
      setData({
        ...result,
        tempData: [...filteredData],
        message: 'No document available',
      });
    } else {
      setData({
        ...result,
        tempData: temp,
        message: 'No document available',
      });
    }
  };
  return (
    <>
      <ScrollView
        style={documentStyle.documentsContainer}
        contentContainerStyle={documents && documentStyle.center}
        showsVerticalScrollIndicator={false}>
        <View style={[ms.search, ms.searchContainer]}>
          <View style={ms.input}>
            <Input
              ref={inputRef}
              placeholder="Search document"
              onChangeText={onChangeSearch}
              autoCapitalize="none"
              value={searchText}
            />
            <View style={ms.icon}>
              <Icon name="magnify" size={24} />
            </View>
          </View>
        </View>
        {!data?.tempData?.length || !documents?.length ? (
          <NoData title="documents" icon={''} />
        ) : (
          data?.tempData?.map((item: any, index: any) => (
            <Document
              key={index}
              type={
                item?.documentPath.split('.')[
                  item?.documentPath?.split('.').length - 1
                ]
              }
              title={item?.name}
              source={item?.documentPath}
              index={index}
            />
          ))
        )}
      </ScrollView>
    </>
  );
};

export default Documents;
