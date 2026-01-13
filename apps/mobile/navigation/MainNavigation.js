import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MoritomoRoutes,
  NonAuthenticatedRoutes,
  ZaimuRoutes,
  KoujouRoutes,
} from '@repo/ui/routes';
import {verticalScale} from '../assets/styles/scaling';
import ZaimuOverview from '../screens/Zaimu/Overview/Overview';
import Transaction from '../screens/Zaimu/Transaction/Transaction';
import Moritomo from '../screens/Moritomo/Moritomo';
import {useAppSelector, useAppDispatch} from '@repo/rtk/mobile/hooks.ts';
import Login from '../screens/Moritomo/Login/Login';
import KoujouOverview from '../screens/Koujou/Overview/Overview';
import Workouts from '../screens/Koujou/Workouts/Workouts';
import Statistics from '../screens/Koujou/Statistics/Statistics';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Stack = createNativeStackNavigator();

export const MoritomoStack = () => {
  const app = useAppSelector(state => state.moritomo.app);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={MoritomoRoutes.Moritomo}
        component={Moritomo}
      />

      <Stack.Screen name={ZaimuRoutes.ZaimuOverview} component={ZaimuOverview} />
      <Stack.Screen name={ZaimuRoutes.Transaction} component={Transaction} />

      <Stack.Screen name={KoujouRoutes.KoujouOverview} component={KoujouOverview} />
      <Stack.Screen name={KoujouRoutes.Workouts} component={Workouts} />
      <Stack.Screen name={KoujouRoutes.Statistics} component={Statistics} />
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
