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

  const toggleFilterSection = () => {
    dispatch(setFilterIsOpen(!filterIsOpen));
    // setFilterSectionIsOpen((curr) => !curr);
  };

  return (
    <div className="relative top-0 z-10 flex flex-col items-center justify-start w-full">
      <div
        className={`relative flex flex-col justify-center w-full pt-0 pb-4 nav-bg gap-6 item-center`}
      >
        <div className="flex w-full">
          <div className="w-full cursor-default pointer-events-none" />
          <Link
            href="/"
            className="z-20 flex items-center justify-center mt-6 text-2xl cursor-pointer whitespace-nowrap"
          >
            Where ATM SG?
          </Link>
          <div className="w-full cursor-default pointer-events-none" />
        </div>
        <div className="z-20 flex items-center justify-center w-full max-w-5xl gap-3 px-4 mx-auto">
          <SearchSection />
          <button
            className={`p-0 btn btn-circle ${
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
          opacity: filterIsOpen ? 1 : 0,
          y: filterIsOpen ? 0 : -80,
        }}
        transition={{ type: "tween", duration: 0.2 }}
        className={`absolute z-10 top-[90%] py-3 left-0 right-0 w-full nav-bg ${
          filterIsOpen ? "" : "pointer-events-none"
        }`}
      >
        <FilterSection />
      </motion.div>
    </div>
  );
};

export default Navbar;
