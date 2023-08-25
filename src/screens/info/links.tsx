import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {documentStyle, milestoneStyle as ms} from '../../assets';
import {Icon, InfoPlaceHolder, Input, NoData} from '../../common/ui';
import Link from './link';
import {useAsyncState} from '../../hooks';
import {View} from 'react-native';

const Links = ({loading, links}: {loading: boolean; links: any[]}) => {
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
      data: links,
      tempData: links,
      loading: false,
      message: 'No document available',
    });
  }, []);
  const onChangeSearch = (text: string) => {
    const result = data;
    setSearchText(text);
    let temp = [...links];
    if (text && !/\\/.test(text)) {
      const filteredData = temp.filter((item: any) =>
        item.name.toLowerCase().match(text.toLowerCase()),
      );
      setData({
        ...result,
        tempData: [...filteredData],
        message: 'No links available',
      });
    } else {
      setData({
        ...result,
        tempData: temp,
        message: 'No links available',
      });
    }
  };
  return (
    <ScrollView
      style={documentStyle.documentsContainer}
      contentContainerStyle={links && documentStyle.center}
      showsVerticalScrollIndicator={false}>
      <View style={[ms.search, ms.searchContainer]}>
        <View style={ms.input}>
          <Input
            ref={inputRef}
            placeholder="Search link"
            onChangeText={onChangeSearch}
            autoCapitalize="none"
            value={searchText}
          />
          <View style={ms.icon}>
            <Icon name="magnify" size={24} />
          </View>
        </View>
      </View>
      {!links || data?.loading ? (
        <InfoPlaceHolder type="link" />
      ) : !links || !data?.tempData?.length ? (
        <NoData title="links" icon={''} />
      ) : (
        data?.tempData &&
        data?.tempData?.map((item, index) => (
          <Link key={index} title={item.name} link={item.documentPath} />
        ))
      )}
    </ScrollView>
  );
};

export default Links;
