"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, persistor } from "./store";
// import Lang from "../redux/reducers/Lang"
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(Lang)
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
