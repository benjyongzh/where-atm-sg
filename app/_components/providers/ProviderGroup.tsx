"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/app/_context/store";
import ScreenSizeProvider from "./ScreenSizeProvider";

export default function ProviderGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ScreenSizeProvider>{children}</ScreenSizeProvider>
    </Provider>
  );
}

//nextjs theme
// import { Provider as ThemeProvider } from "@/components/ThemeProvider";
//redux
/* 
export default function ProviderGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProvider>
    <StoreProvider store={store}>
      <ScreenSizeProvider>{children}</ScreenSizeProvider>
    </StoreProvider>
    // </ThemeProvider>
  );
}
 */
