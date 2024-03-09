"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

//animation
import { motion } from "framer-motion";
import { errorMessageModalContainerVariant } from "@/lib/framerVariants";

const ErrorMessageModal = (props: { displayTime: number }) => {
  const dispatch = useAppDispatch();
  const { displayTime } = props;
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  let timeOut: NodeJS.Timeout;

  const handleClick = () => {
    if (errorMessage) {
    }
    clearErrorMessage();
    console.log("error message modal click detected");
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
  }, [errorMessage]);

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
