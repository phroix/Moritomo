import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MoritomoRoutes,
  NonAuthenticatedRoutes,
  ZaimuRoutes,
} from '@repo/ui/routes';
import {verticalScale} from '../assets/styles/scaling';
import Overview from '../screens/Zaimu/Overview/Overview';
import Transaction from '../screens/Zaimu/Transaction/Transaction';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Stack = createNativeStackNavigator();

export const Zaimu = () => {
  return (
    <Stack.Navigator initialRouteName={ZaimuRoutes.Overview}>
      <Stack.Screen name={ZaimuRoutes.Overview} component={Overview} />
      <Stack.Screen name={ZaimuRoutes.Transaction} component={Transaction} />
    </Stack.Navigator>
  );
};

export const Moritomo = () => {
  return (
    <Stack.Navigator initialRouteName={MoritomoRoutes.Moritomo}>
      <Stack.Screen name={MoritomoRoutes.Moritomo} component={Moritomo} />
    </Stack.Navigator>
  );
};

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator initialRouteName={NonAuthenticatedRoutes.Login}>
      <Stack.Screen name={NonAuthenticatedRoutes.Login} component={Login} />
    </Stack.Navigator>
  );
};
