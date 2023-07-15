"use client";
import { useState } from "react";
//components
import AddressInput from "./AddressInput";
import RangeSetting from "./RangeSetting";

//redux
import {
  setSearchLocationPoint,
  IGeoCode,
  setMaxRange,
} from "@/features/settings/settingsSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

const FilterSection = () => {
  const [addressInput, setAddressInput] = useState("");
  const [rangeValue, setRangeValue] = useState(2000);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const endpoint = "/api/filterData";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify({ addressInput, rangeValue }),
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result);

    dispatch(setSearchLocationPoint(result.searchPointLatLong));
    dispatch(setMaxRange(rangeValue));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full gap-6 p-5 section"
    >
      <div className="flex flex-col items-center justify-between w-full gap-4 sm:gap-16 sm:flex-row">
        {/* addressInput */}
        <div className="w-full gap-1 sm:gap-3 form-control">
          <label
            className="label label-text whitespace-nowrap"
            htmlFor="inputAddress"
          >
            Search Address
          </label>
          <input
            id="inputAddress"
            className="w-full input input-bordered input-primary"
            type="text"
            placeholder="location address"
            name="inputAddress"
            required
            onChange={(e) => setAddressInput(e.target.value)}
          ></input>
        </div>

        {/* Range Setting */}
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
              min="10"
              max="3000"
              required
              onChange={(e) => setRangeValue(parseInt(e.target.value))}
              value={rangeValue}
            />
            <input
              id="rangeNumber"
              className="w-24 text-center input input-bordered input-primary"
              type="number"
              name="rangeNumber"
              value={rangeValue}
              onChange={(e) => setRangeValue(parseInt(e.target.value))}
            ></input>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button className="w-full mt-5 btn btn-primary sm:w-auto" type="submit">
        Search
      </button>
    </form>
  );
};

export default FilterSection;
