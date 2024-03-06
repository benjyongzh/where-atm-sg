"use client";

import Link from "next/link";

//components
import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import ErrorMessageModal from "@/components/ErrorMessageModal";

//anims
import SettingsIcon from "@/public/assets/icons/settings.svg";
import { LayoutGroup, motion } from "framer-motion";
import {
  verticalMovementOnlyVariant,
  opacityOnlyVariant,
  errorMessageModalContainerVariant,
} from "@/lib/framerVariants";

//redux
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setFilterIsOpen } from "@/features/settings/settingsSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );
  const errorMessage: string | null = useAppSelector(
    (state) => state.errors.displayedErrorMessage
  );

  const toggleFilterSection = () => {
    dispatch(setFilterIsOpen(!filterIsOpen));
    // setFilterSectionIsOpen((curr) => !curr);
  };

  const handleErrorMessageClick = () => {
    console.log("handleErrorMessageClick detected");
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
      <motion.div
        variants={verticalMovementOnlyVariant}
        transition={{ type: "tween", duration: 0.2 }}
        animate={mediaBreakpoint === "xs" && !filterIsOpen ? "hidden" : "show"}
        className={`${
          mediaBreakpoint === "xs" && !filterIsOpen ? "pointer-events-none" : "" //TODO mobile view leads to errorMessageModal overlapping at top of atmList component
        }`}
      >
        <motion.div
          variants={opacityOnlyVariant}
          transition={{ type: "tween", duration: 0.2 }}
          animate={
            mediaBreakpoint === "xs" && !filterIsOpen ? "hidden" : "show"
          }
          className="nav-bg h-[80%]"
        >
          <FilterSection />
        </motion.div>

        <motion.div
          variants={errorMessageModalContainerVariant}
          //transition={{ type: "tween", duration: 0.2 }}
          //transition={{ type: "spring", bounce: 0.5 }}
          animate={errorMessage ? "show" : "hidden"}
          className={`nav-bg ${errorMessage ? "" : "pointer-events-none"}`}
        >
          <ErrorMessageModal
            displayTime={20000}
            textContent={errorMessage}
            clickEvent={handleErrorMessageClick}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
