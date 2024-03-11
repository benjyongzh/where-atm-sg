"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

//animation
import { motion } from "framer-motion";
import { errorMessageModalContainerVariant } from "@/lib/framerVariants";

const ErrorMessageModal = (props: {
  displayTime: number;
  message: string | null;
  clickToClear: boolean;
  hookValueForTimerRefresh: any;
}) => {
  const dispatch = useAppDispatch();
  const {
    displayTime,
    message: errorMessage,
    clickToClear,
    hookValueForTimerRefresh,
  } = props;

  let timeOut: NodeJS.Timeout;

  const handleClick = () => {
    console.log("error message modal click detected");
    if (errorMessage) {
    }
    if (clickToClear) {
      clearErrorMessage();
    }
  };

  const clearErrorMessage = () => {
    setDisplayErrorMessage(null, dispatch);
  };

  useEffect(() => {
    console.log("useeffect is run");
    clearTimeout(timeOut);
    if (errorMessage !== null)
      timeOut = setTimeout(clearErrorMessage, displayTime); //TODO timer does not refresh upon new error created

    return () => {
      clearTimeout(timeOut);
    };
  }, [hookValueForTimerRefresh]);

  return errorMessage ? (
    <motion.div
      layout
      initial={"hidden"}
      animate={"show"}
      exit={"hidden"}
      variants={errorMessageModalContainerVariant}
      className="nav-bg"
    >
      <div
        onClick={handleClick}
        className={`relative flex flex-col justify-center item-center px-4 text-error ${
          errorMessage !== null ? "" : "pointer-events-none"
        }`}
      >
        {errorMessage}
      </div>
    </motion.div>
  ) : null;
};

export default ErrorMessageModal;
