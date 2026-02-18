// packages/design-system/src/tokens/colors.ts

// ─────────────────────────────────────────────
// RAW PALETTE (aus globals.css)
// ─────────────────────────────────────────────
export const palette = {
  white:  '#ffffff',
  black:  '#000000',

  gray: {
    100: '#ebebef',
    200: '#dedee3',
    300: '#c6c6c8',
    400: '#3a3a3c',
    500: '#363638',
    600: '#242426',
    700: '#38383a',
  },

  // System Colors – Light
  red:   { light: '#d70015',   dark: '#ff6961' },
  green: { light: '#248a3d',   dark: '#30db5b' },
  cyan:  { light: '#0071a4',   dark: '#70d7ff' },
} as const;

// ─────────────────────────────────────────────
// SEMANTIC TOKENS
// ─────────────────────────────────────────────
export const semanticColors = {
  light: {
    backgrounds: {
      base: {
        primary:   palette.white,           // #ffffff
        secondary: palette.gray[100],       // #ebebef
        tertiary:  palette.white,           // #ffffff
      },
      elevated: {
        primary:   palette.gray[100],       // #ebebef
        secondary: palette.gray[200],       // #dedee3
        tertiary:  palette.gray[200],       // #dedee3
      },
      grouped: {
        primary:   palette.gray[100],       // #ebebef
        secondary: palette.white,           // #ffffff
        tertiary:  palette.gray[100],       // #ebebef
      },
      groupedElevated: {
        primary:   undefined,              // nicht definiert im Light Mode
        secondary: undefined,
        tertiary:  undefined,
      },
    },
    text: {
      primary:    palette.black,                       // #000000
      secondary:  'rgba(60, 60, 67, 0.8)',
      tertiary:   'rgba(60, 60, 67, 0.7)',
      quaternary: 'rgba(60, 60, 67, 0.55)',
    },
    labels: {
      primary:    palette.black,                       // #000000
      secondary:  'rgba(60, 60, 67, 0.6)',
      tertiary:   'rgba(60, 60, 67, 0.3)',
      quaternary: 'rgba(60, 60, 67, 0.18)',
    },
    separators: {
      opaque:    palette.gray[300],                    // #c6c6c8
      nonOpaque: 'rgba(60, 60, 67, 0.29)',
    },
    system: {
      red:   palette.red.light,                        // #d70015
      green: palette.green.light,                      // #248a3d
      cyan:  palette.cyan.light,                       // #0071a4
    },
  },

  dark: {
    backgrounds: {
      base: {
        primary:   palette.black,                      // #000000
        secondary: palette.gray[600],                  // #242426
        tertiary:  palette.gray[500],                  // #363638
      },
      elevated: {
        primary:   palette.gray[600],                  // #242426
        secondary: palette.gray[500],                  // #363638
        tertiary:  palette.gray[500],                  // #363638
      },
      grouped: {
        primary:   palette.gray[600],                  // #242426
        secondary: palette.gray[500],                  // #363638
        tertiary:  palette.gray[400],                  // #3a3a3c
      },
      groupedElevated: {
        primary:   palette.black,                      // #000000
        secondary: palette.gray[600],                  // #242426
        tertiary:  palette.gray[500],                  // #363638
      },
    },
    text: {
      primary:    palette.white,                       // #ffffff
      secondary:  'rgba(235, 235, 245, 0.6)',
      tertiary:   'rgba(235, 235, 245, 0.3)',
      quaternary: 'rgba(235, 235, 245, 0.16)',
    },
    labels: {
      primary:    palette.white,                       // #ffffff
      secondary:  'rgba(235, 235, 245, 0.7)',
      tertiary:   'rgba(235, 235, 245, 0.55)',
      quaternary: 'rgba(235, 235, 245, 0.4)',
    },
    separators: {
      opaque:    palette.gray[700],                    // #38383a
      nonOpaque: 'rgba(84, 84, 86, 0.35)',
    },
    system: {
      red:   palette.red.dark,                         // #ff6961
      green: palette.green.dark,                       // #30db5b
      cyan:  palette.cyan.dark,                        // #70d7ff
    },
  },
} as const;

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type ColorMode     = 'light' | 'dark';
export type SemanticColors = typeof semanticColors.light;