import * as React from "react";
import styles from "./MonthYearPicker.module.css";
import {
  getMonthNames,
  rangeYears,
  addMonths,
  toKey,
  MonthIndex,
} from "@repo/config/monthYear";
import NextMonthButton from "../NextMonthButton/NextMonthButton";
import Headline from "../Headline/Headline";

type Props = {
  value: { year: number; month: MonthIndex };
  onChange: (v: { year: number; month: MonthIndex }) => void;
  minYear?: number;
  maxYear?: number;
  locale?: string; // z.B. "de-DE"
  monthWidth?: "long" | "short" | "narrow";
  className?: string;
};

export function MonthYearPicker({
  value,
  onChange,
  minYear,
  maxYear,
  locale = "de-DE",
  monthWidth = "long",
  className,
}: Props) {
  const months = React.useMemo(
    () => getMonthNames(locale, monthWidth),
    [locale, monthWidth]
  );
  const years = React.useMemo(
    () => rangeYears(value.year, 10, minYear, maxYear),
    [value.year, minYear, maxYear]
  );

  const changeMonth = (m: MonthIndex) =>
    onChange({ year: value.year, month: m });
  const changeYear = (y: number) => onChange({ year: y, month: value.month });

  const nav = (delta: number) =>
    onChange(addMonths(value.year, value.month, delta));

  return (
    <div className={styles.monthYearPickerContainer}>
      <NextMonthButton
        color="--system-colors-system-cyan"
        onClick={() => nav(-1)}
      />
      <div className={styles.monthYearPickerContent}>
        <Headline
          text={`${months[value.month]} ${value.year}`}
          type="titleLarge"
          color="--text-primary"
        />
      </div>
      <NextMonthButton
        isReverse={true}
        color="--system-colors-system-cyan"
        onClick={() => nav(1)}
      />
    </div>
  );
}
