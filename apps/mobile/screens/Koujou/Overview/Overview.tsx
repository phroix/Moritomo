import React, {useState, useCallback, useMemo} from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';
import {Calendar, CalendarUtils, DateData} from 'react-native-calendars';
import {useGetWorkoutsQuery, KoujouWorkout} from '@repo/rtk/koujouWorkouts';
import {useAppSelector} from '@repo/rtk/mobile/hooks.ts';
import {selectMoritomo} from '@repo/rtk/moritomo';
import style from './style';
import {WEEKDAY_COLORS} from '@repo/config/types/Workouts.ts';
import {useTheme} from '../../../hooks/useTheme';

const TODAY = CalendarUtils.getCalendarDateString(new Date());

// JS Date: 0=Sonntag, 1=Montag ... 6=Samstag
// Daten-Format: 1=Montag ... 7=Sonntag
const jsWeekdayToDataWeekday = (jsDay: number): number =>
  jsDay === 0 ? 7 : jsDay;

const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub ?? null;
  } catch {
    return null;
  }
};

const getMarkedDatesForMonth = (
  year: number,
  month: number,
  workouts: KoujouWorkout[],
) => {
  const weekdayMap = new Map<number, KoujouWorkout>();
  for (const workout of workouts) {
    weekdayMap.set(workout.weekday, workout);
  }

  const markedDates: Record<string, any> = {};
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const weekday = jsWeekdayToDataWeekday(date.getDay());
    const workout = weekdayMap.get(weekday);

    if (workout) {
      const dateString = CalendarUtils.getCalendarDateString(date);
      markedDates[dateString] = {
        marked: true,
        dotColor: WEEKDAY_COLORS[weekday] ?? '#999',
      };
    }
  }

  return markedDates;
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

  const [selected, setSelected] = useState<string | null>(null);
  const [visibleMonth, setVisibleMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  const onMonthChange = useCallback((month: DateData) => {
    setVisibleMonth({year: month.year, month: month.month});
  }, []);

  const markedDates = useMemo(() => {
    const marks = getMarkedDatesForMonth(
      visibleMonth.year,
      visibleMonth.month,
      workouts,
    );

    if (selected && marks[selected]) {
      marks[selected] = {
        ...marks[selected],
        selected: true,
        selectedColor: marks[selected].dotColor,
      };
    } else if (selected) {
      marks[selected] = {
        selected: true,
        selectedColor: '#333',
      };
    }

    return marks;
  }, [visibleMonth, workouts, selected]);

  // console.log(workouts);

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
      style={{ backgroundColor: colors.backgrounds.base.primary }}>
      <Calendar
        enableSwipeMonths
        current={TODAY}
        style={style.calendar}
        firstDay={1}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        markedDates={markedDates}
        theme={{
          dotStyle: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginTop: 2,
          },
        }}
      />
    </ScrollView>
  );
};

export default KoujouOverview;
