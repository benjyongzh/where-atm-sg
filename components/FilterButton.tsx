"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  addBankFilter,
  removeBankFilter,
} from "@/features/settings/settingsSlice";

const FilterButton = (props: { name: string }) => {
  const [activated, setActivated] = useState(true);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    activated
      ? dispatch(addBankFilter(props.name))
      : dispatch(removeBankFilter(props.name));
    setActivated((curr) => !curr);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-1 rounded-md ${
        activated ? "bg-sky-500" : "bg-slate-400"
      }`}
    >
      {props.name}
    </button>
  );
};

export default FilterButton;
