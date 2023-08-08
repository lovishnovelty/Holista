import moment from 'moment';
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {Linking, Platform} from 'react-native';

const getEpisodeType = (user: any, episode: any) => {
  const episodeDetail = episode.rows[0]?.benefitDetails;
  return episodeDetail;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    const number = parsePhoneNumberFromString(`+1${phoneNumber}`);
    return number?.formatNational();
  }
  return null;
};

export const getFinalIdCardData = (
  userData: any,
  memberData: any,
  episodeData: any,
) => {
  const userProfile = {
    dob: memberData.dob,
    subscriberNumber: memberData?.subscriberNumber,
    memberName:
      memberData.lastname && memberData.middlename
        ? memberData.firstName +
          ' ' +
          memberData.middleName +
          ' ' +
          memberData.lastName
        : memberData.lastName
        ? memberData.firstName + ' ' + memberData.lastName
        : memberData.firstName,
    episodeDetail:
      userData.roles[0].roleCode === 'MP' || userData.secondaryRole === 'MP'
        ? getEpisodeType(userData, episodeData)
        : null,
  };

  const finalUserProfile = {
    groupName: episodeData.rows[0]?.groupName,
    benefitPlan: episodeData.rows[0]?.benefitPlan,
    planCode: episodeData.rows[0]?.planCode,
    episodeDetail: userProfile.episodeDetail,
    claimTitle: episodeData.rows[0]?.claimContactText,
    customerTitle: episodeData.rows[0]?.customerContactText,
    claimCall: episodeData.rows[0]?.claimContactNumber,
    customerCall: episodeData.rows[0]?.customerContactNumber,
    dob: userProfile.dob ? moment(userProfile.dob).format('MM/DD/YYYY') : '',
    memberName: userProfile.memberName,
    subscriberNumber: userProfile.subscriberNumber,
    logo: episodeData.rows[0]?.logo,
    groupId: episodeData.rows[0]?.groupId,
    pwpLink: episodeData.rows[0]?.pwpLink,
    pwpText: episodeData.rows[0]?.pwpText,
    copayText: episodeData.rows[0]?.copayText,
    clearingHouseName: episodeData.rows[0]?.clearingHouseName,
    clearingHouseText: episodeData.rows[0]?.clearingHouseText,
    payerId: episodeData.rows[0]?.payerId,
    payerText: episodeData.rows[0]?.payerText,
    submitClaimText: episodeData.rows[0]?.submitClaimText,
    episodeTypeText: episodeData.rows[0]?.episodeTypeText,
    episodeBenefitDateText: episodeData.rows[0]?.episodeBenefitDateText,
  };
 
  return finalUserProfile;
};

export const dialCall = (number: string) => {
  Linking.openURL(
    Platform.OS === 'android' ? `tel:${number}` : `telprompt:${number}`,
  );
};
