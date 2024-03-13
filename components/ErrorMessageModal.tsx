"use client";
import { useEffect } from "react";

//animation
import { motion } from "framer-motion";
import { errorMessageModalContainerVariant } from "@/lib/framerVariants";

type errorMessageModalProps = {
  displayTime: number;
  message: string | null;
  clickToClear: boolean;
  onClearEventHook?: Function;
  hookValuesForTimerRefresh: Array<any>;
};

const ErrorMessageModal = (props: errorMessageModalProps) => {
  const {
    displayTime,
    message: errorMessage,
    clickToClear,
    onClearEventHook,
    hookValuesForTimerRefresh,
  } = props;

  let timeOut: number;

  const handleClick = () => {
    if (clickToClear && onClearEventHook) {
      onClearEventHook();
    }
  };

  useEffect(() => {
    console.log("useeffect is run");
    clearTimeout(timeOut);
    if (errorMessage !== null && onClearEventHook)
      timeOut = global.setTimeout(onClearEventHook, displayTime);

    return () => {
      clearTimeout(timeOut);
    };
  }, hookValuesForTimerRefresh);

  return (
    <motion.div
      key="errorMessageModal"
      layout
      initial={"hidden"}
      animate={"show"}
      exit={"hidden"}
      variants={errorMessageModalContainerVariant}
      className="nav-bg"
      onClick={handleClick}
    >
      <div
        className={`relative flex flex-col justify-center item-center px-4 text-error`}
      >
        {errorMessage}
        {/* TODO emphasize when there is a new errorMessage */}
      </div>
    </motion.div>
  );
};

export default ErrorMessageModal;
