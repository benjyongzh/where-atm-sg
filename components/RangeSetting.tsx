"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setMaxRange } from "@/features/settings/settingsSlice";
import { useState } from "react";
import { validateMaxRangeInput } from "@/lib/maxRange";

const RangeSetting = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const [rangeValue, setRangeValue] = useState(storedRange);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    const int = parseInt(value);
    setRangeValue(int);
    dispatch(setMaxRange(int));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 section form-control">
      <label className="label" htmlFor="rangeSetting">
        Search Radius
      </label>
      <input
        id="rangeSetting"
        className="range"
        type="range"
        name="rangeSetting"
        min="10"
        max="3000"
        required
        onChange={(e) => handleChange(e.target.value)}
        value={rangeValue}
      ></input>
    </div>
  );
};

export default RangeSetting;
