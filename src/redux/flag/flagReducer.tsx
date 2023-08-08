const initialState = {
  fetch: false,
};

const flagReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH':
      return {...state, fetch: !state.fetch};

    default:
      return state;
  }
};

export {flagReducer};
