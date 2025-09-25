import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./web/store";

const initialState = {
  selectedLang: "de",
  de: {
    title: "Hallo ich bin Phil",
    description: "Ich bin ein Entwickler",
    footer: "© 2025 Phileas Roth. Alle Rechte vorbehalten.",
    dataPrivacy: "Datenschutz",
    imprint: "Impressum",
  },
  en: {
    title: "Hello I am Phil",
    description: "I am a developer",
    footer: "© 2025 Phileas Roth. All rights reserved.",
    dataPrivacy: "Data Privacy",
    imprint: "Imprint",
  },
};

export const Lang = createSlice({
  name: "lang",
  initialState: initialState,
  reducers: {
    resetLang: () => {
      return initialState;
    },
    updateLang: (state, action: PayloadAction<string>) => {
      state.selectedLang = action.payload;
    },
  },
});

export const { resetLang, updateLang } = Lang.actions;
export const selectLang = (state: any) => state.lang;

export default Lang.reducer;
