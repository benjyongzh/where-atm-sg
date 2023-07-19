"use client";

import Link from "next/link";
import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import { useState } from "react";
import SettingsIcon from "@/public/assets/icons/settings.svg";

import { motion } from "framer-motion";

const Navbar = () => {
  const [filterSectionIsOpen, setFilterSectionIsOpen] = useState(true);

  const toggleFilterSection = () => {
    setFilterSectionIsOpen((curr) => !curr);
  };

  return (
    <div className="top-0 flex flex-col items-center justify-start w-full">
      <div
        className={`relative flex flex-col justify-center w-full gap-6 px-8 py-2 item-center`}
      >
        <Link
          href="/"
          className="z-10 flex items-center justify-center mt-6 text-2xl cursor-pointer whitespace-nowrap"
        >
          Where ATM SG?
        </Link>
        <div className="z-10 flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full max-w-4xl gap-3">
            <SearchSection />
            <button
              className={`flex justify-center p-0 btn btn-circle ${
                filterSectionIsOpen ? "btn-primary" : "btn-ghost"
              }  item-center`}
              onClick={() => toggleFilterSection()}
            >
              <SettingsIcon className="w-6 h-6 " alt="Search settings" />
            </button>
          </div>
        </div>
        <motion.div
          animate={{
            opacity: filterSectionIsOpen ? 1 : 0,
            y: filterSectionIsOpen ? 0 : -80,
          }}
          transition={{ type: "tween", duration: 0.2 }}
          className={`absolute top-full py-3 left-0 right-0 w-full bg-transparent backdrop-blur-sm`}
        >
          <FilterSection />
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
