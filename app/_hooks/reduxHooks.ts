// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/context/store";

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/app/_context/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
