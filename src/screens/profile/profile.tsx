import {useDispatch, useSelector} from 'react-redux';
import React, {useContext, useEffect, useState} from 'react';
import {
  Icon,
  NavHeader,
  ProfilePlaceHolder,
  RegularText,
  Wrapper,
} from '../../common/ui';
import {color, dashboardStyle, profileStyle} from '../../assets';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import ListItem from './listItem';
import {formatPhoneNumber} from '../../utils/idcard';
import {normalize, removeLocalData, removeToken} from '../../utils';
import {api} from '../../api/api';
import {AuthContext} from '../../context';

const Profile = () => {
  const [state, setState] = useState<any>({
    companyInfo: {},
    loaded: false,
  });
  const user = useSelector((state: any) => state.auth.userData);
  const {dispatch: authDispatch} = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    removeToken();
    removeLocalData('user');
    removeLocalData('isDisclaimerViewed');
    removeLocalData('telemedicineLink');
    dispatch({type: 'SIGN_OUT'});
    dispatch({type: 'CLEAR_DATA'});
  };

  const fetchProfile = async () => {
    try {
      const url = `/api/purchasers/${user.data.referenceCode}`;
      const {data} = await api.get(url);
      console.log(data, 'progileee', state);

      setState({
        companyInfo: data.data,
        loaded: true,
      });
    } catch (error) {}
  };

  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        title="Profile"
        rightIcon="logout"
        rightIconSize={25}
        rightIconPress={logout}
      />
      {state.loaded ? (
        <ScrollView
          style={profileStyle.align}
          showsVerticalScrollIndicator={false}>
          <View style={dashboardStyle.disclamier}>
            <Icon name="alert" color={color.white} />
            <View style={{flex: 1, marginLeft: normalize(10)}}>
              <RegularText
                title="DISCLAIMER: This portal does not provide medical advice"
                style={{textAlign: 'left', color: color.white}}
              />
            </View>
            <TouchableOpacity
              style={{flex: 0.4}}
              onPress={() =>
                authDispatch({
                  type: 'LOAD_DISCLAIMER',
                  payload: true,
                })
              }>
              <RegularText
                title="Learn more"
                style={dashboardStyle.learnMore}
              />
            </TouchableOpacity>
          </View>
          <RegularText
            title="Personal Information"
            style={profileStyle.titleText}
          />
          <ListItem
            icon="account"
            keyname="Name"
            value={user.data.firstName + ' ' + user.data.lastName}
          />
          <ListItem
            icon="card-account-details-outline"
            keyname="Subscriber Number"
            value={user.data?.subscriberNumber?.toUpperCase()}
          />
          <ListItem
            icon="office-building"
            keyname="Purchaser"
            value={state.companyInfo?.name}
          />
          <ListItem icon="email" keyname="Email" value={user.data.email} />
          <ListItem
            icon="cellphone-android"
            keyname="Phone"
            value={formatPhoneNumber(user.data.phone)?.toString()}
          />
        </ScrollView>
      ) : (
        <ProfilePlaceHolder />
      )}
    </Wrapper>
  );
};

export {Profile};
