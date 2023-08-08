import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Linking, Text} from 'react-native';
import {cardStyle, theme} from '../../assets';
import {IdCardPlaceHolder, NoData, RegularText} from '../../common/ui';
import {checkEmpty, normalize} from '../../utils';
import {
  dialCall,
  formatPhoneNumber,
  getFinalIdCardData,
} from '../../utils/idcard';
import {useSelector, useDispatch} from 'react-redux';
import {getRequest} from '../../services/request';

const Card = () => {
  const [finalData, setfinalData] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.userData);
  const idData = useSelector((state: any) => state.data.idcard);
  const dispatch = useDispatch();

  const getData = async () => {
    if (user.data.memberUuid) {
      try {
        Promise.all([
          getRequest(`/api/members/${user.data.memberUuid}`),
          getRequest(`/api/users/${user.data.memberUuid}/id-cards`),
        ]).then((values: Array<any>) => {
          const idData = getFinalIdCardData(
            user.data,
            values[0].data,
            values[1].data,
          );
          setfinalData(idData);
          dispatch({type: 'SET_ID_DATA', payload: {idcard: idData}});
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkEmpty(idData) ? getData() : setfinalData(idData);
  }, []);

  return (
    <>
      {finalData && finalData.episodeDetail && finalData.episodeDetail.length && (
        <View style={cardStyle.container}>
          <>
            <View style={cardStyle.title}>
              <Image
                source={{
                  uri: finalData?.logo,
                }}
                resizeMode="stretch"
                style={{
                  width: normalize(87),
                  height: normalize(theme.size.lg),
                }}
              />
              <RegularText
                title="Episode of Care Member ID Card"
                style={cardStyle.text}
              />
            </View>
            <View>
              <View style={cardStyle.title}>
                <RegularText
                  title="Group Name"
                  style={{
                    fontSize: normalize(theme.size.xs),
                    marginTop: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
                <RegularText
                  title={finalData.groupName}
                  style={[
                    cardStyle.groupNameTxt,
                    {marginTop: normalize(theme.size.xs)},
                  ]}
                />
              </View>
              {finalData.groupId && (
                <View style={cardStyle.title}>
                  <RegularText
                    title="Group ID"
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                  <RegularText
                    title={finalData.groupId}
                    style={[cardStyle.groupNameTxt]}
                  />
                </View>
              )}
              <View style={cardStyle.title}>
                <RegularText
                  title="Benefit Plan"
                  style={cardStyle.benefitPlanTxt}
                />
                <RegularText
                  title={finalData.benefitPlan}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
              </View>
              <View style={cardStyle.title}>
                <RegularText
                  title="Plan Code"
                  style={cardStyle.benefitPlanTxt}
                />
                <RegularText
                  title={finalData.planCode}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
              </View>
              <View style={cardStyle.title}>
                <RegularText
                  title="Subscriber Number"
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
                <RegularText
                  title={finalData.subscriberNumber}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
              </View>
              <View style={cardStyle.title}>
                <RegularText
                  title="Member Name"
                  style={cardStyle.memberNameTxt}
                />
                <RegularText
                  title={finalData.memberName}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
              </View>
              <View style={cardStyle.title}>
                <RegularText title="Date of Birth" style={cardStyle.dobTxt} />
                <RegularText
                  title={finalData.dob}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
              </View>

              {/* table */}
              {finalData.episodeDetail[0] && (
                <View style={cardStyle.tableAlign}>
                  <View style={[cardStyle.title, cardStyle.tableHeader]}>
                    <View style={cardStyle.c1}>
                      <RegularText
                        title={finalData.episodeTypeText}
                        style={cardStyle.episodeTxt}
                      />
                    </View>
                    <View style={cardStyle.c2}>
                      <RegularText
                        title={finalData.episodeBenefitDateText}
                        style={cardStyle.commonTxtStyle}
                      />
                    </View>
                  </View>
                  {finalData.episodeDetail.map(
                    (episode: any, index: number) => (
                      <View
                        style={[cardStyle.title, cardStyle.bothSideBorder]}
                        key={index}>
                        <View style={cardStyle.c1}>
                          <RegularText
                            title={episode.episodeType}
                            style={cardStyle.commonTxtStyle}
                          />
                        </View>
                        <View style={cardStyle.c2}>
                          <RegularText
                            title={episode.benefitDates}
                            style={cardStyle.commonTxtStyle}
                          />
                        </View>
                      </View>
                    ),
                  )}
                </View>
              )}
              <Text style={cardStyle.adminTxtStyle}>For Adminstration</Text>
              {/* contact info */}
              <View style={cardStyle.title}>
                <RegularText
                  title={finalData.claimTitle}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
                <TouchableOpacity onPress={() => dialCall(finalData.claimCall)}>
                  <RegularText
                    title={formatPhoneNumber(finalData.claimCall)}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={cardStyle.title}>
                <RegularText
                  title={finalData.customerTitle}
                  style={{
                    fontSize: normalize(theme.size.xs),
                    textAlign: 'left',
                  }}
                />
                <TouchableOpacity
                  onPress={() => dialCall(finalData.customerCall)}>
                  <RegularText
                    title={formatPhoneNumber(finalData.customerCall)}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={cardStyle.title}>
                <RegularText
                  title={finalData.submitClaimText}
                  style={cardStyle.commonTxtStyle}
                />
              </View>

              <View style={cardStyle.listAlign}>
                <View style={cardStyle.title}>
                  <RegularText
                    title={finalData.clearingHouseText}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                  <RegularText
                    title={finalData.clearingHouseName}
                    style={cardStyle.commonTxtStyle}
                  />
                </View>
                <View style={cardStyle.title}>
                  <RegularText
                    title={finalData.payerText}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                  <RegularText
                    title={finalData.payerId}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                </View>
              </View>
              <View style={cardStyle.linkWrapper}>
                <View style={{flex: 1}}>
                  <RegularText
                    title={finalData.pwpText}
                    style={{
                      fontSize: normalize(theme.size.xs),
                      textAlign: 'left',
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      finalData.pwpLink &&
                        Linking.openURL(`${finalData.pwpLink}`);
                    }}>
                    <RegularText
                      title={finalData.pwpLink}
                      style={cardStyle.link}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <RegularText
                  title={finalData.copayText}
                  style={cardStyle.txtMsg}
                />
              </View>
            </View>
          </>
        </View>
      )}
      {!finalData && user.data.memberUuid && <IdCardPlaceHolder />}
      {((!finalData && !user.data.memberUuid) ||
        (finalData && !finalData.episodeDetail)) && (
        <View style={cardStyle.nodataWrapper}>
          <NoData title="ID Card" icon="card-account-details" />
        </View>
      )}
    </>
  );
};
export default Card;
