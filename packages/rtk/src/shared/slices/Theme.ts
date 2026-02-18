// packages/store/src/slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ColorMode } from '@repo/ui/colors';

export interface ThemeState {
  mode: ColorMode | 'system';
}

const initialState: ThemeState = { mode: 'system' };

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeState['mode']>) {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;