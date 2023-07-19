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
    <div className="top-0 z-10 flex flex-col items-center justify-start w-full">
      <div
        className={`relative flex flex-col justify-center w-full gap-6 px-8 py-2 item-center`}
      >
        <Link
          href="/"
          className="z-20 flex items-center justify-center mt-6 text-2xl cursor-pointer whitespace-nowrap"
        >
          Where ATM SG?
        </Link>
        <div className="z-20 flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full max-w-4xl gap-3">
            <SearchSection />
            <button
              className={`flex justify-center p-0 btn btn-circle ${
                filterIsOpen ? "btn-primary" : "btn-ghost"
              }  item-center`}
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
          className={`absolute top-full py-3 left-0 right-0 w-full bg-transparent backdrop-blur-md ${
            filterIsOpen ? "" : "pointer-events-none"
          }`}
        >
          <FilterSection />
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
