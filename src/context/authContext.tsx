import React, {useReducer} from 'react';

const AuthReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'LOAD_DISCLAIMER':
      console.log(action.payload, 'action.payload');

      return {
        ...prevState,
        disclaimer: action.payload,
      };

    case 'SET_DISCLAIMER':
      console.log('call', action.payload.disclaimer);

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

const initialState = {
  disclaimer: false,
  biometric: false,
};
const AuthContext = React.createContext(initialState);

const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return {
    state,
    dispatch,
  };
};

export {useAuth, AuthContext};
