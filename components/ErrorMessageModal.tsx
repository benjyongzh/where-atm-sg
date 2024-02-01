"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

const ErrorMessageModal = () => {
  const dispatch = useAppDispatch();
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  useEffect(() => {
    console.log("useeffect is run");
    if (errorMessage !== null)
      setTimeout(() => setDisplayErrorMessage(null, dispatch), 10000); //TODO timer does not refresh upon new error created

    // return () => {
    //   setDisplayErrorMessage(null);
    // };
  }, [errorMessage]);

  if (errorMessage === null) return; //TODO should use framermotion for displaying this component

  return (
    <div className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]">
      <div
        // TODO create a onClick event to clear this component
        className={`relative flex flex-col justify-center nav-bg gap-2 item-center`}
      >
        {errorMessage}
        {/* TODO it showed '1' when search initiated with zero filtered banks */}
        {/* TODO styling of error messages of different severity, if any*/}
      </div>
    </div>
  );
};

export default ErrorMessageModal;
