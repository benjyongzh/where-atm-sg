"use client";
import { useState } from "react";
//components
import AddressInput from "./AddressInput";
import RangeSetting from "./RangeSetting";

import { minSearchRange, maxSearchRange } from "@/lib/maxRange";

//redux
import {
  setSearchLocationPoint,
  setMaxRange,
} from "@/features/settings/settingsSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";

const SearchSection = () => {
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const storedSearchAddress = useAppSelector(
    //   (state) => state.settings.searchLocationPoint
    // );

    const endpoint = "/api/search";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify({ addressInput, searchRange: maxSearchRange }),
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result);
    dispatch(setSearchLocationPoint(result.searchPointLatLong));
    if (!isErrorMessageObject(result)) {
      // overall fetching success
      // check for handled error messages
      result.errorMessages.forEach((error: errorMessageObject) => {
        console.log(error);
      });
      console.log("nearbyATMs: ", result.nearbyAtms);
    } else {
      //fetching failed
      console.log("Fetching error: ", result.errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full gap-6 p-5 section"
    >
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

      {/* Submit */}
      <button className="w-full mt-5 btn btn-primary sm:w-auto" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchSection;
