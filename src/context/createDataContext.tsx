import React, {useReducer} from 'react';

export default (
  reducer: any,
  actions: any,
  initialState: any,
  defaultValue: any,
) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({children}: {children: any}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let boundAction: any = {};
    for (let key in actions) {
      boundAction[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{state, ...boundAction}}>
        {children}
      </Context.Provider>
    );
  };

  return {Provider, Context};
};
