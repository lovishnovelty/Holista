import {CometChatLogout} from '../../utils';

const initialState = {
  isLoading: true,
  isSignout: true,
  isSignedIn: false,
  userToken: null,
  userData: {},
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'RELOAD':
      return {
        ...state,
        isLoading: false,
      };
    case 'SET_DISCLAIMER':
      const tempData = state.userData;
      tempData.data.userSetting.disclaimerAck = action.payload;
      return {
        ...state,
        userData: tempData,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        isSignedIn: true,
        isLoading: false,
        userToken: action.payload.token,
        userData: action.payload.user,
        disclaimerAck: action.payload.disclaimerAck,
      };

    case 'SIGN_OUT':
      CometChatLogout();
      return {
        ...state,
        isSignout: true,
        userToken: null,
        isSignedIn: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export {authReducer};
