"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

const ErrorMessageModal = () => {
  const dispatch = useAppDispatch();
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  //to add timeout for errormodal
  useEffect(() => {
    console.log("useeffect is run");
    if (errorMessage !== null)
      setTimeout(() => setDisplayErrorMessage(null, dispatch), 1000);

    // return () => {
    //   setDisplayErrorMessage(null);
    // };
  }, [errorMessage]);

  if (errorMessage === null) return;

  return (
    <div className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]">
      <div
        className={`relative flex flex-col justify-center nav-bg gap-2 item-center`}
      >
        {errorMessage}
        //TODO it showed '1' when search initiated with zero filtered banks
      </div>
    </div>
  );
};

export default ErrorMessageModal;
