"use client";

import { useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";


const ErrorMessageModal = () => {
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  return mediaBreakpoint === "xs" ? null : (
    <div className="relative z-10 flex flex-col items-stretch max-h-[30%] lg:max-h-none overflow-y-auto mt-auto lg:mt-0 lg:w-[30%] max-w-5xl">
      <div
        className={`flex flex-col items-center gap-2 h-full min-h-0 mb-10 nav-bg justify-start`}
      >
      </div>
    </div>
  );
};

export default ErrorMessageModal;
