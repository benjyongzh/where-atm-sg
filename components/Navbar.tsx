"use client";

import Link from "next/link";
import { useState } from "react";

//components
import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import SettingsIcon from "@/public/assets/icons/settings.svg";

//anims
import { motion } from "framer-motion";

//redux
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setFilterIsOpen } from "@/features/settings/settingsSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const toggleFilterSection = () => {
    dispatch(setFilterIsOpen(!filterIsOpen));
    // setFilterSectionIsOpen((curr) => !curr);
  };

  return (
    <div className="relative z-10 flex flex-col items-stretch justify-start w-full lg:w-[30%]">
      <div
        className={`relative flex flex-col justify-center nav-bg gap-2 item-center`}
      >
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
        animate={{
          opacity: filterIsOpen || mediaBreakpoint !== "xs" ? 1 : 0,
          y: filterIsOpen || mediaBreakpoint !== "xs" ? 0 : -80,
        }}
        transition={{ type: "tween", duration: 0.2 }}
        className={
          mediaBreakpoint === "xs"
            ? `absolute z-10 top-[94%] left-0 right-0 nav-bg ${
                filterIsOpen ? "" : "pointer-events-none"
              }`
            : `relative z-10 flex justify-center items-center -mt-0.5 nav-bg`
        }
      >
        <FilterSection />
      </motion.div>
    </div>
  );
};

export default Navbar;
