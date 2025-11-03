import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { LangSlice } from "../shared/slices/Lang";
import { MoritomoSlice } from "../shared/slices/Moritomo";
import { moritomoApi } from "../shared/querys/MoritomoApi";
import { listenerMiddleware } from "../mobile/listenerMiddleware";
import storageSession from 'redux-persist/lib/storage/session'
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const rootReducer = combineReducers({
  lang: LangSlice.reducer,
  moritomo: MoritomoSlice.reducer,
  [moritomoApi.reducerPath]: moritomoApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
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
export const persistor = persistStore(makeStore());

