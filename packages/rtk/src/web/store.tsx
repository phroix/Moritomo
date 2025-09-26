import { configureStore } from "@reduxjs/toolkit";
import { LangSlice } from "../shared/slices/Lang";
import { MoritomoSlice } from "../shared/slices/Moritomo";

export const makeStore = () => {
  return configureStore({
    reducer: {
      lang: LangSlice.reducer,
      moritomo: MoritomoSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
