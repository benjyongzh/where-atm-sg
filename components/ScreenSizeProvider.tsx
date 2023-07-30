"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { useWindowDimensions } from "@/hooks/displayHooks";
import { storeScreenSize } from "@/features/display/displaySlice";

const ScreenSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    dispatch(storeScreenSize({ screenWidth: width, screenHeight: height }));
  }, [height, width]);
  return <>{children}</>;
};

export default ScreenSizeProvider;
