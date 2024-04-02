"use client";

import Link from "next/link";

//components
import SearchSection from "@/app/_components/SearchSection";
import FilterSection from "@/app/_components/FilterSection";
import ErrorMessageModal from "@/app/_components/ErrorMessageModal";

//anims
import SettingsIcon from "@/public/assets/icons/settings.svg";
import { AnimatePresence, motion } from "framer-motion";
import { filterSectionContainerVariant } from "@/app/_lib/framerVariants";

//libs
import { errorMessageQueue } from "@/app/_lib/errors";
import { ERRORMESSAGE_TIMEOUT } from "@/app/_config/app.config";

//redux
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { setFilterIsOpen } from "@/app/_features/settings/settingsSlice";
import { setDisplayedErrorMessage } from "@/app/_features/errors/errorsSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );
  const allErrorMessages: errorMessageQueue = useAppSelector(
    (state) => state.errors.currentErrorMessages
  );

  const toggleFilterSection = () => {
    dispatch(setFilterIsOpen(!filterIsOpen));
  };

  const onClearErrorMessage = () => {
    dispatch(setDisplayedErrorMessage(null));
  };

  return (
    <div className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]">
      <div className={`flex-col nav-bg gap-2`}>
        <div className="flex w-full">
          <div className="w-full cursor-default pointer-events-none lg:hidden" />
          <Link
            href="/"
            className="z-20 flex items-center justify-center text-lg cursor-pointer whitespace-nowrap lg:justify-start"
          >
            Where ATM SG?
          </Link>
          <div className="w-full cursor-default pointer-events-none lg:hidden" />
        </div>
        <div className="z-20 flex items-center justify-center w-full max-w-5xl gap-3 mx-auto">
          <SearchSection />
          <button
            className={`sm:hidden p-0 btn btn-circle ${
              filterIsOpen ? "btn-secondary" : "btn-primary"
            }`}
            onClick={() => toggleFilterSection()}
          >
            <SettingsIcon className="w-6 h-6 " alt="Search settings" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mediaBreakpoint !== "xs" || filterIsOpen ? (
          <motion.div
            layout
            key="filterSection"
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            variants={filterSectionContainerVariant}
            className="nav-bg"
          >
            <FilterSection />
          </motion.div>
        ) : null}

        {errorMessage && (
          <ErrorMessageModal
            key="errorMessageModal"
            displayTime={ERRORMESSAGE_TIMEOUT}
            message={errorMessage}
            clickToClear={true}
            onClearEventHook={onClearErrorMessage}
            hookValuesForTimerRefresh={[errorMessage, allErrorMessages]}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
