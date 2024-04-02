"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/app/_hooks/reduxHooks";
import { useWindowDimensions } from "@/app/_hooks/displayHooks";
import { storeScreenSize } from "@/app/_features/display/displaySlice";

const ScreenSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    dispatch(storeScreenSize({ screenWidth: width, screenHeight: height }));
  }, [height, width]);
  return <>{children}</>;
};

export default ScreenSizeProvider;
