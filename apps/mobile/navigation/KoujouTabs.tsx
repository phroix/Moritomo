import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {KoujouRoutes} from '@repo/ui/routes';
import KoujouOverview from '../screens/Koujou/Overview/Overview';
import Workouts from '../screens/Koujou/Workouts/Workouts';
import Statistics from '../screens/Koujou/Statistics/Statistics';
import {useTheme} from '../hooks/useTheme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarDays,
  faDumbbell,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const KoujouTabs = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgrounds.base.primary,
          borderTopColor: colors.separators.opaque,
        },
        tabBarActiveTintColor: colors.system.cyan,
        tabBarInactiveTintColor: colors.text.tertiary,
      }}>
      <Tab.Screen
        name={KoujouRoutes.KoujouOverview}
        component={KoujouOverview}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCalendarDays} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={KoujouRoutes.Workouts}
        component={Workouts}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faDumbbell} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={KoujouRoutes.Statistics}
        component={Statistics}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faChartSimple} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default KoujouTabs;
