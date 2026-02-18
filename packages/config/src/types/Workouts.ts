// Farben pro Weekday (1=Montag, 2=Dienstag, ..., 7=Sonntag)
// Light: kräftigere Töne, Dark: leuchtende Töne mit gutem Kontrast
export const WEEKDAY_COLORS: Record<string, Record<number, string>> = {
  light: {
    1: '#D93636',
    2: '#2BA89E',
    3: '#2196C9',
    4: '#4CAF7D',
    5: '#D4A017',
    6: '#AB47BC',
    7: '#E08A2C',
  },
  dark: {
    1: '#FF8A80',
    2: '#64FFDA',
    3: '#80D8FF',
    4: '#69F0AE',
    5: '#FFD740',
    6: '#EA80FC',
    7: '#FFAB40',
  },
};