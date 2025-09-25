import React, {useEffect, useState} from 'react';
// import {NonAuthenticated, SplashScreenStack} from './MainNavigation';
import {Zaimu} from './MainNavigation';
// import {useAppSelector} from '../redux/hooks';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
// import {selectPermissions} from '../redux/reducers/Auth';

const RootNavigation = () => {
  // const isLoading = useAppSelector(s => s.auth.isLoading);
  // const [splash, setSplash] = React.useState(true);

  // useEffect(() => {
  //   const t = setTimeout(() => setSplash(false), 700);
  //   return () => clearTimeout(t);
  // }, []);

  // if (splash) return <SplashScreenStack />;

  // return <NonAuthenticated />;
  return <Zaimu />;
};

export default RootNavigation;
