import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MoritomoRoutes,
  NonAuthenticatedRoutes,
  ZaimuRoutes,
} from '@repo/ui/routes';
import {verticalScale} from '../assets/styles/scaling';
import Overview from '../screens/Zaimu/Overview/Overview';
import Transaction from '../screens/Zaimu/Transaction/Transaction';
import Moritomo from '../screens/Moritomo/Moritomo';
import {useAppSelector, useAppDispatch} from '@repo/rtk/mobile/hooks.ts';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Stack = createNativeStackNavigator();

export const MoritomoStack = () => {
  const app = useAppSelector(state => state.moritomo.app);

  return (
    <Stack.Navigator>
      {/* {app === 'moritomo' && ( */}
        <Stack.Screen
          options={{headerShown: false}}
          name={MoritomoRoutes.Moritomo}
          component={Moritomo}
        />
      {/* )} */}
      {/* {app === 'zaimu' && (
        <> */}
          <Stack.Screen
            options={{headerLargeTitle: true, headerBackVisible: true}}
            name={ZaimuRoutes.Overview}
            component={Overview}
          />
          <Stack.Screen
            name={ZaimuRoutes.Transaction}
            component={Transaction}
          />
        {/* </>
      )} */}
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
