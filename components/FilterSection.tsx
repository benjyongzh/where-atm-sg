"use client";
import { useState } from "react";
import { getLatLongFromGeoCodeResult } from "@/features/googleAPI/geocoder";

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

    const searchPos: IGeoCode = getLatLongFromGeoCodeResult(result.searchPoint);
    console.log(searchPos);

    dispatch(setSearchLocationPoint(searchPos));
    dispatch(setMaxRange(rangeValue));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full gap-4 p-5 sm:flex-row section"
    >
      {/* addressInput */}
      <div className="w-full gap-3 form-control">
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
          onChange={(e) => setRangeValue(parseInt(e.target.value))}
          value={rangeValue}
        ></input>
      </div>

      {/* Submit */}
      <button className="w-full btn btn-primary sm:w-auto" type="submit">
        Search
      </button>
    </form>
  );
};

export default FilterSection;
