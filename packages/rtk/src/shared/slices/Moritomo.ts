import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../mobile/store";
import { ModeState } from "@repo/config/moritomo";
import { AuthState } from "@repo/config/auth";
import { Mode } from "@repo/config/moritomo";

const initialState: AuthState & ModeState = {
  // session: {
  //   access_token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2RkYmZkYy00YzA4LTQ4MTMtYWU5OC1jNGUzYzY2NTExMzUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzYyMTg2MDMzLCJpYXQiOjE3NjIxODI0MzMsImVtYWlsIjoicGhpcml0aDAxQHByb3Rvbi5tZSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzYyMTgyNDMzfV0sInNlc3Npb25faWQiOiIwNTQ3MTA1My1mNzI2LTRlZTgtYjRhZS03ODM2OGU5ZjZjMzMiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.ZY_UN4ZMGOHC3TanEjLGnUAQCkeryanxaPkNxi6_2Sg",
  //   refresh_token: "c3k4n7hzynko",
  // },
  session: null,
  authStatus: "nonAuthenticated",
  // authStatus: "authenticated",
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
