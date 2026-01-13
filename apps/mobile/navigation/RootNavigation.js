import React, {useEffect, useState} from 'react';
// import {NonAuthenticated, SplashScreenStack} from './MainNavigation';
import {MoritomoStack, NonAuthenticated} from './MainNavigation';
import {useAppSelector} from '@repo/rtk/mobileHooks';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
// import {selectPermissions} from '../redux/reducers/Auth';

const RootNavigation = () => {
  const {authStatus} = useAppSelector(state => state.moritomo);
  // const isLoading = useAppSelector(s => s.auth.isLoading);
  // const [splash, setSplash] = React.useState(true);

  // useEffect(() => {
  //   const t = setTimeout(() => setSplash(false), 700);
  //   return () => clearTimeout(t);
  // }, []);

  // if (splash) return <SplashScreenStack />;
  if (authStatus === 'nonAuthenticated') {
    return <NonAuthenticated />;
  }
  // return <NonAuthenticated />;
  return <MoritomoStack />;
};

export default RootNavigation;
