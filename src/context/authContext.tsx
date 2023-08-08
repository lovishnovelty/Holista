import React, {useReducer} from 'react';

const AuthReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'LOAD_DISCLAIMER':
      return {
        ...prevState,
        disclaimer: action.payload,
      };
    case 'SET_DISCLAIMER':
      return {
        ...prevState,
        disclaimer: action.payload.disclaimer,
        biometric: action.payload.biometric,
      };
    case 'BIOMETRIC':
      return {
        ...prevState,
        biometric: action.payload.biometric,
      };
  }
};

const AuthContext = React.createContext();

const initialState = {
  disclaimer: false,
  biometric: false,
};
const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export {useAuth, AuthContext};
