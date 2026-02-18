import React, {useState, useCallback, useMemo} from 'react';
import {Calendar, CalendarUtils, DateData} from 'react-native-calendars';
import {KoujouWorkout} from '@repo/rtk/koujouWorkouts';
import {useTheme} from '../../hooks/useTheme';
import style from './style';
import {WEEKDAY_COLORS} from '@repo/config/types/Workouts.ts';

const TODAY = CalendarUtils.getCalendarDateString(new Date());

// JS Date: 0=Sonntag, 1=Montag ... 6=Samstag
// Daten-Format: 1=Montag ... 7=Sonntag
const jsWeekdayToDataWeekday = (jsDay: number): number =>
  jsDay === 0 ? 7 : jsDay;

const getMarkedDatesForMonth = (
  year: number,
  month: number,
  workouts: KoujouWorkout[],
  colorMode: string,
) => {
  const weekdayMap = new Map<number, KoujouWorkout>();
  for (const workout of workouts) {
    weekdayMap.set(workout.weekday, workout);
  }

  const colors = WEEKDAY_COLORS[colorMode] ?? WEEKDAY_COLORS.light;
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
        dotColor: colors[weekday] ?? '#999',
      };
    }
  }

  return markedDates;
};

type KoujouCalendarProps = {
  workouts: KoujouWorkout[];
};

const KoujouCalendar = ({workouts}: KoujouCalendarProps) => {
  const {mode, colors} = useTheme();
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
      mode,
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
        selectedColor: colors.text.tertiary,
      };
    }

    return marks;
  }, [visibleMonth, workouts, selected, mode, colors]);

  return (
    <Calendar
      key={mode}
      enableSwipeMonths
      current={TODAY}
      style={style.calendar}
      firstDay={1}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      markedDates={markedDates}
      theme={{
        backgroundColor: colors.backgrounds.base.primary,
        calendarBackground: colors.backgrounds.base.primary,
        dayTextColor: colors.text.primary,
        textDisabledColor: colors.text.quaternary,
        monthTextColor: colors.text.primary,
        textMonthFontWeight: 'bold',
        arrowColor: colors.text.secondary,
        todayTextColor: colors.system.cyan,
        dotStyle: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginTop: 2,
        },
      }}
    />
  );
};

export default KoujouCalendar;
