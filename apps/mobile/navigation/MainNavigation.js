import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MoritomoRoutes,
  NonAuthenticatedRoutes,
  ZaimuRoutes,
} from '@repo/ui/routes';
import ZaimuOverview from '../screens/Zaimu/Overview/Overview';
import Transaction from '../screens/Zaimu/Transaction/Transaction';
import Moritomo from '../screens/Moritomo/Moritomo';
import {useAppSelector} from '@repo/rtk/mobile/hooks.ts';
import Login from '../screens/Moritomo/Login/Login';
import KoujouTabs from './KoujouTabs';
import {useTheme} from '../hooks/useTheme';

const Stack = createNativeStackNavigator();

export const MoritomoStack = () => {
  const app = useAppSelector(state => state.moritomo.app);
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.backgrounds.base.primary},
        headerTintColor: colors.text.primary,
        headerTitleStyle: {color: colors.text.primary},
        contentStyle: {backgroundColor: colors.backgrounds.base.primary},
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={MoritomoRoutes.Moritomo}
        component={Moritomo}
      />

      <Stack.Screen name={ZaimuRoutes.ZaimuOverview} component={ZaimuOverview} />
      <Stack.Screen name={ZaimuRoutes.Transaction} component={Transaction} />

      <Stack.Screen
        name="KoujouTabs"
        component={KoujouTabs}
        options={{title: 'Koujou'}}
      />
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
