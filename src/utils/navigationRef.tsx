import React from 'react';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export const goBack = () => navigationRef.current.goBack();

export const getCurrentRouteName = () =>
  navigationRef?.current?.getCurrentRoute()?.name ?? null;
