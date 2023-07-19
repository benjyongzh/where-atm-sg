"use client";
import { useState } from "react";
//redux
import { setSearchLocationPoint } from "@/features/settings/settingsSlice";
import { setAtmData } from "@/features/atmData/atmDataSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

import { maxSearchRange } from "@/features/settings/settingsSlice";
import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";
import { rawFetchedNearbyPlacesInfo } from "@/lib/atmObject";

import SearchIcon from "@/public/assets/icons/search.svg";
// import { MdSearch } from "react-icons/md";

const SearchSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    //should validate and sanitize addressInput string here first
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
    setIsLoading(false);
  };

  const storeSearchedAtms = (allAtms: Array<any>) => {
    const processedAtmData: rawFetchedNearbyPlacesInfo[] = allAtms.map(
      (atmInfo: any) => {
        return {
          location: {
            lat: atmInfo.geometry.location.lat,
            lng: atmInfo.geometry.location.lng,
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
      className="flex items-center justify-between w-full gap-2 rounded-full pe-0 input justify-self-end input-bordered input-primary"
    >
      <input
        id="inputAddress"
        className="w-full h-12 bg-transparent outline-none"
        type="text"
        placeholder="location address"
        name="inputAddress"
        required
        onChange={(e) => setAddressInput(e.target.value)}
      ></input>
      <button
        disabled={isLoading}
        className={`flex justify-center p-0 btn btn-circle item-center ${
          !isLoading ? "btn-ghost" : "btn-disabled"
        }`}
        type="submit"
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <SearchIcon className="w-6 h-6" alt="Search" />
          //<MdSearch size={"2em"} />
        )}
      </button>
    </form>
  );
};

export default SearchSection;
