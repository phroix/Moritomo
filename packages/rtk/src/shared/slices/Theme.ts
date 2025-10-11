import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedTheme: "light",
  lightColors: {
    //backgrounds
    systemBackgroundsBase: {
      primary: "#FFFFFF",
      secondary: "#EBEBEF",
      tertiary: "#FFFFFF",
    },
    systemBackgroundsElevated: {
      primary: "#EBEBEF",
      secondary: "#DEDEE3",
      tertiary: "#DEDEE3",
    },
    systemGroupedBackgrounds: {
      primary: "#EBEBEF",
      secondary: "#FFFFFF",
      tertiary: "#EBEBEF",
    },

    //text
    text: {
      primary: "#000000",
      secondary: "#3C3C43", //opacity 80%
      tertiary: "#3C3C43", //opacity 70%
      quaternary: "#3C3C43", //opacity 55%
    },

    //labels
    labels: {
      primary: "#000000",
      secondary: "#3C3C43", //opacity 60%
      tertiary: "#3C3C43", //opacity 30%
      quaternary: "#3C3C43", //opacity 18%
    },

    //separators
    separators: {
      opaque: "#C6C6C8",
      NonOpaque: "#3C3C43", //opacity 29%
    },

    //colors
    colors:{
      systemRed: "D70015",
      systemGreen: "248A3D",
      systemCyan: "0071A4",
    }
  },
  darkColors: {
    //backgrounds
    systemBackgroundsBase: {
      primary: "#000000",
      secondary: "#242426",
      tertiary: "#363638",
    },
    systemBackgroundsElevated: {
      primary: "#242426",
      secondary: "#363638",
      tertiary: "#363638",
    },
    systemGroupedBackgrounds: {
      primary: "#242426",
      secondary: "#363638",
      tertiary: "#3A3A3C",
    },
    systemGroupedBackgroundsElevated: {
      primary: "#000000",
      secondary: "#242426",
      tertiary: "#363638",
    },

    //text
    text: {
      primary: "#FFFFFF",
      secondary: "#EBEBF5", //opacity 60%
      tertiary: "#EBEBF5", //opacity 30%
      quaternary: "#EBEBF5", //opacity 16%
    },

    //labels
    labels: {
      primary: "#FFFFFF",
      secondary: "#EBEBF5", //opacity 70%
      tertiary: "#EBEBF5", //opacity 55%
      quaternary: "#EBEBF5", //opacity 40%
    },

    //separators
    separators: {
      opaque: "#38383A",
      NonOpaque: "#3C3C43", //opacity 29%
    },

    //colors
    colors:{
      systemRed: "FF6961",
      systemGreen: "30DB5B",
      systemCyan: "70D7FF",
    }
  },
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    resetTheme: () => {
      return initialState;
    },
  },
});

export const { resetTheme } = ThemeSlice.actions;
export const selectTheme = (state: any) => state.theme;

export default ThemeSlice.reducer;
