import { configureStore } from "@reduxjs/toolkit";
import { LangSlice } from "../shared/slices/Lang";
import { MoritomoSlice } from "../shared/slices/Moritomo";
import { moritomoApi } from "../shared/querys/MoritomoApi";
import { listenerMiddleware } from "../mobile/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      lang: LangSlice.reducer,
      moritomo: MoritomoSlice.reducer,
      [moritomoApi.reducerPath]: moritomoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: true,
      })
        .prepend(listenerMiddleware.middleware)
        .concat(moritomoApi.middleware) as unknown as ReturnType<
        typeof getDefaultMiddleware
      >,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
