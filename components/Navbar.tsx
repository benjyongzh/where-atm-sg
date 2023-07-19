"use client";

import Link from "next/link";
import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import { useState } from "react";
import SettingsIcon from "@/public/assets/icons/settings.svg";

const Navbar = () => {
  const [filterSectionIsOpen, setFilterSectionIsOpen] = useState(true);

  const toggleFilterSection = () => {
    setFilterSectionIsOpen((curr) => !curr);
  };

  return (
    <div className="fixed top-0 flex flex-col items-center justify-start w-full bg-base-200">
      <div className="flex flex-col justify-center w-full gap-3 px-8 py-2 item-center">
        <Link
          href="/"
          className="flex items-center justify-center mt-2 text-2xl cursor-pointer whitespace-nowrap"
        >
          Where ATM SG?
        </Link>
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full max-w-4xl gap-3">
            <SearchSection />
            <button
              className="flex justify-center p-0 btn btn-circle btn-ghost item-center"
              onClick={() => toggleFilterSection()}
            >
              <SettingsIcon className="w-6 h-6 " alt="Search settings" />
            </button>
          </div>
        </div>
      </div>
      <FilterSection isOpen={filterSectionIsOpen} />
    </div>
  );
};

export default Navbar;
