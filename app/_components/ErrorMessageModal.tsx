"use client";
import { useEffect } from "react";

//animation
import { motion, useAnimate } from "framer-motion";
import { errorMessageModalContainerVariant } from "@/app/_lib/framerVariants";

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

  const [scope, animate] = useAnimate();

  const handleClick = () => {
    if (clickToClear && onClearEventHook) {
      onClearEventHook();
    }
  };
  const emphasizeText = () => {
    animate(scope.current, { scale: [null, 1.2, 1] }, { duration: 0.3 });
  };

  useEffect(() => {
    console.log("useeffect is run");
    clearTimeout(timeOut);
    if (errorMessage !== null && onClearEventHook)
      timeOut = global.setTimeout(onClearEventHook, displayTime);
    emphasizeText();

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
        ref={scope}
        className={`relative flex flex-col justify-center item-center px-4 text-error`}
      >
        {errorMessage}
      </div>
    </motion.div>
  );
};

export default ErrorMessageModal;
