"use client";
import { useState } from "react";
//redux
import { setSearchLocationPoint } from "@/features/settings/settingsSlice";
import { setAtmData } from "@/features/atmData/atmDataSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

import { maxSearchRange } from "@/lib/maxRange";
import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";
import { rawFetchedNearbyPlacesInfo } from "@/lib/atmObject";

const SearchSection = () => {
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
    // console.log(result);
    dispatch(setSearchLocationPoint(result.searchPointLatLong));
    if (!isErrorMessageObject(result)) {
      // overall fetching success
      // check for handled error messages
      result.errorMessages.forEach((error: errorMessageObject) => {
        console.log(error);
      });
      storeSearchedAtms(result.nearbyAtms.results);
    } else {
      //fetching failed
      console.log("Fetching error: ", result.errorMessage);
    }
  };

  const storeSearchedAtms = (allAtms: Array<any>) => {
    const processedAtmData: rawFetchedNearbyPlacesInfo[] = allAtms.map(
      (atmInfo: any) => {
        return {
          location: {
            lat: atmInfo.geometry.location.lat,
            long: atmInfo.geometry.location.lng,
          },
          name: atmInfo.name,
          place_id: atmInfo.place_id,
          vicinity: atmInfo.vicinity,
        };
      }
    );
    // console.log("processedAtmData: ", processedAtmData);
    dispatch(setAtmData(processedAtmData));
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
