import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../mobile/store";
import { ModeState } from "@repo/config/moritomo";
import { AuthState } from "@repo/config/auth";
import { Mode } from "@repo/config/moritomo";

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
