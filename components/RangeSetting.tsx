"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setMaxRange } from "@/features/settings/settingsSlice";
import { useState } from "react";
import {
  minSearchRange,
  maxSearchRange,
} from "@/features/settings/settingsSlice";

const RangeSetting = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);
  const [rangeValue, setRangeValue] = useState(storedRange);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    const int = parseInt(value);
    setRangeValue(int);
    dispatch(setMaxRange(int));
  };

  return (
    <div className="flex flex-col w-full gap-1 sm:flex-row sm:gap-3 form-control">
      <label
        className="label label-text whitespace-nowrap"
        htmlFor="rangeSetting"
      >
        Search Radius
      </label>
      <div className="flex items-center justify-between w-full gap-3">
        <input
          id="rangeBar"
          className="range range-primary"
          type="range"
          name="rangeBar"
          min={minSearchRange}
          max={maxSearchRange}
          required
          onChange={(e) => handleChange(e.target.value)}
          value={rangeValue}
          disabled={!filterIsOpen}
        />
        <input
          id="rangeNumber"
          className={`w-24 text-center input input-bordered input-primary ${
            filterIsOpen ? "" : "cursor-default"
          }`}
          type="number"
          name="rangeNumber"
          value={rangeValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={!filterIsOpen}
        ></input>
      </div>
    </div>
  );
};

export default RangeSetting;
