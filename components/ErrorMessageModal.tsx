"use client";
import { useAppSelector } from "@/hooks/reduxHooks";

const ErrorMessageModal = () => {
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  if (errorMessage === null) return;

  return (
    <div className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]">
      <div
        className={`relative flex flex-col justify-center nav-bg gap-2 item-center`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default ErrorMessageModal;
