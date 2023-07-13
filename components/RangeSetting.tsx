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
    setRangeValue(parseInt(value));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const validInput = validateMaxRangeInput(rangeValue);
    setRangeValue(validInput);
    dispatch(setMaxRange(validInput));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full"
    >
      {/* <div>storedrange: {storedRange}</div>
      <div>rangeValue: {rangeValue}</div> */}
      <div className="flex items-center justify-center w-full gap-3 p-4">
        <label htmlFor="rangeSetting">Search Radius</label>
        <input
          id="rangeSetting"
          className=""
          type="number"
          name="rangeSetting"
          required
          onChange={(e) => handleChange(e.target.value)}
          value={rangeValue}
        ></input>
      </div>
      <button className="px-3 py-1 rounded-md bg-sky-500" type="submit">
        Confirm
      </button>
      {/* <ErrorList
        errors={errors}
        includePaths={[inputName]}
        checkFormInputValidityStyle={(bool) => setHasError(bool)}
      /> */}
    </form>
  );
};

export default RangeSetting;
