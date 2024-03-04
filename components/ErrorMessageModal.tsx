"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setDisplayErrorMessage } from "@/lib/errors";

const ErrorMessageModal = (props: {
  displayTime: number;
  textContent: string | null;
  clickEvent: Function;
}) => {
  const dispatch = useAppDispatch();
  const { displayTime, textContent, clickEvent } = props;

  const handleClick = () => {
    if (textContent) {
      clickEvent;
    }
    //TODO clear this component upon clicking
    console.log("error message modal click detected");
  };

  useEffect(() => {
    console.log("useeffect is run");
    if (textContent !== null)
      setTimeout(() => setDisplayErrorMessage(null, dispatch), displayTime); //TODO timer does not refresh upon new error created

    // return () => {
    //   setDisplayErrorMessage(null, dispatch);
    // };
  }, [textContent]);

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col justify-center item-center px-4 text-error ${
        textContent !== null ? "" : "pointer-events-none"
      }`}
    >
      {textContent}
    </div>
  );
};

export default ErrorMessageModal;
