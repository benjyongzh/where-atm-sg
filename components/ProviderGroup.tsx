"use client";

//nextjs theme
// import { Provider as ThemeProvider } from "@/components/ThemeProvider";
//redux
import { Provider as StoreProvider } from "react-redux";
import { store /* storeWrapper */ } from "@/context/store";

export default function ProviderGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeProvider>
    <StoreProvider store={store}>{children}</StoreProvider>
    // </ThemeProvider>
  );
}
