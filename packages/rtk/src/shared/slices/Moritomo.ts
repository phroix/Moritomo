import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../mobile/store";

type AuthStatus = "nonAuthenticated" | "authenticated" | "admin" | null;
type App = "moritomo" | "zaimu";
export type Mode = "regular" | "debug";

export interface ModeState {
  mode: Mode;
  app: App;
}

export interface AuthState {
  session: any | null;
  authStatus: AuthStatus;
}

const initialState: AuthState & ModeState = {
  session: null,
  authStatus: "nonAuthenticated",
  mode: "regular",
  app: "moritomo",
};

export const MoritomoSlice = createSlice({
  name: "moritomo",
  initialState: initialState,
  reducers: {
    resetMoritomo: () => {
      return initialState;
    },
    updateMoritomoState: (state, action: PayloadAction<any>) => {
      if (action.payload.session) {
        state.session = {
          access_token: action.payload.session.access_token,
          refresh_token: action.payload.session.refresh_token,
        };
      }
      if (action.payload.authStatus) {
        state.authStatus = action.payload.authStatus;
      }
      if (action.payload.app) {
        state.app = action.payload.app;
      }
    },
    updateMoritomoMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default MoritomoSlice.reducer;

export const selectMoritomo = (state: RootState) => state.moritomo;

export const { resetMoritomo, updateMoritomoState, updateMoritomoMode } =
  MoritomoSlice.actions;
