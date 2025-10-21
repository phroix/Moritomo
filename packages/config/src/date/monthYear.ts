export type MonthIndex = 0|1|2|3|4|5|6|7|8|9|10|11;

export function getMonthNames(locale = "de-DE", width: "long"|"short"|"narrow" = "long"): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { month: width });
  // 1970-01-01 als Basis, dann 0..11 Monate addieren
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(Date.UTC(1970, i, 1))));
}

export function clampYear(year: number, minYear?: number, maxYear?: number): number {
  if (minYear != null && year < minYear) return minYear;
  if (maxYear != null && year > maxYear) return maxYear;
  return year;
}

export function rangeYears(center: number, span = 10, minYear?: number, maxYear?: number): number[] {
  const start = clampYear(center - span, minYear, maxYear);
  const end   = clampYear(center + span, minYear, maxYear);
  const years: number[] = [];
  for (let y = start; y <= end; y++) years.push(y);
  return years;
}

export function addMonths(year: number, month: MonthIndex, delta: number): { year: number; month: MonthIndex } {
  const abs = year * 12 + month + delta;
  const y = Math.floor(abs / 12);
  const m = ((abs % 12) + 12) % 12;
  return { year: y, month: m as MonthIndex };
}

export function toKey(year: number, month: MonthIndex) { return `${year}-${String(month+1).padStart(2,"0")}`; }

export type MonthYear = { year: number; month: MonthIndex };

export function parseMonthYear(s: string): MonthYear | null {
  const m = /^(\d{4})-(\d{2})$/.exec(s);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  if (month < 0 || month > 11) return null;
  return { year, month: month as MonthIndex };
}