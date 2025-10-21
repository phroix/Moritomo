import * as React from "react";
import { getMonthNames, rangeYears, addMonths, toKey, MonthIndex } from "@repo/config/monthYear";

type Props = {
  value: { year: number; month: MonthIndex };
  onChange: (v: { year: number; month: MonthIndex }) => void;
  minYear?: number;
  maxYear?: number;
  locale?: string;                 // z.B. "de-DE"
  monthWidth?: "long"|"short"|"narrow";
  className?: string;
};

export function MonthYearPicker({
  value, onChange, minYear, maxYear, locale = "de-DE", monthWidth = "long", className
}: Props) {

  const months = React.useMemo(() => getMonthNames(locale, monthWidth), [locale, monthWidth]);
  const years  = React.useMemo(() => rangeYears(value.year, 10, minYear, maxYear), [value.year, minYear, maxYear]);

  const changeMonth = (m: MonthIndex) => onChange({ year: value.year, month: m });
  const changeYear  = (y: number)      => onChange({ year: y, month: value.month });

  const nav = (delta: number) => onChange(addMonths(value.year, value.month, delta));

  return (
    <div className={["inline-flex items-center gap-2", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        aria-label="Vorheriger Monat"
        onClick={() => nav(-1)}
        className="px-2 py-1 rounded border hover:bg-black/5"
      >‹</button>

      <div className="flex gap-2">
        <select
          aria-label="Monat wählen"
          value={toKey(2000, value.month)} // stabiler value
          onChange={(e) => {
            const mm = Number(e.target.value.split("-")[1]) - 1 as MonthIndex;
            changeMonth(mm);
          }}
          className="px-2 py-1 rounded border bg-white"
        >
          {months.map((name, i) => (
            <option key={i} value={toKey(2000, i as MonthIndex)}>
              {name}
            </option>
          ))}
        </select>

        <select
          aria-label="Jahr wählen"
          value={value.year}
          onChange={(e) => changeYear(Number(e.target.value))}
          className="px-2 py-1 rounded border bg-white"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        aria-label="Nächster Monat"
        onClick={() => nav(1)}
        className="px-2 py-1 rounded border hover:bg-black/5"
      >›</button>
    </div>
  );
}