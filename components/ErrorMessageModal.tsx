"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

//anims
import { motion } from "framer-motion";

const ErrorMessageModal = () => {
  const dispatch = useAppDispatch();
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  const handleClick = () => {
    //TODO clear this component
    console.log("error message clicked");
  };

  useEffect(() => {
    console.log("useeffect is run");
    if (errorMessage !== null)
      setTimeout(() => setDisplayErrorMessage(null, dispatch), 10000); //TODO timer does not refresh upon new error created

    // return () => {
    //   setDisplayErrorMessage(null, dispatch);
    // };
  }, [errorMessage]);

  return (
    <motion.div
      animate={{
        opacity: errorMessage !== null ? 1 : 0,
        y: errorMessage !== null ? 0 : 80,
      }}
      transition={{ type: "tween", duration: 0.2 }}
      className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]"
    >
      <div
        onClick={errorMessage !== null ? handleClick : () => {}}
        className={`relative flex flex-col justify-center nav-bg gap-2 item-center`}
      >
        {errorMessage}
        {/* TODO styling of error messages of different severity, if any*/}
      </div>
    </motion.div>
  );
};

export default ErrorMessageModal;
