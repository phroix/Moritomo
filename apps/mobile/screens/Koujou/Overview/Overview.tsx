import React from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';
import {useGetWorkoutsQuery} from '@repo/rtk/koujouWorkouts';
import {useAppSelector} from '@repo/rtk/mobile/hooks.ts';
import {selectMoritomo} from '@repo/rtk/moritomo';
import KoujouCalendar from '../../../components/KoujouCalendar/KoujouCalendar';
import {useTheme} from '../../../hooks/useTheme';

const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub ?? null;
  } catch {
    return null;
  }
};

const KoujouOverview = () => {
  const {colors} = useTheme();
  const {session} = useAppSelector(selectMoritomo);
  const userId = session?.access_token
    ? getUserIdFromToken(session.access_token)
    : null;

  const {data: workouts = [], isLoading} = useGetWorkoutsQuery(
    {user_id: userId!},
    {skip: !userId},
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.backgrounds.base.primary}}>
      <KoujouCalendar workouts={workouts} />
    </ScrollView>
  );
};

export default KoujouOverview;
