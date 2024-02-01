"use client";
import { useState } from "react";
//redux
import {
  setSearchLocationPoint,
  setFilterIsOpen,
} from "@/features/settings/settingsSlice";
import { setAtmData, setSearchStarted } from "@/features/atmData/atmDataSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { bankFilters } from "@/lib/atmObject";

//utils
import {
  takeActionIfNoErrors,
  logErrorsToStore,
  instantOverrideErrorMessageStore,
} from "@/lib/errors";

//graphics
import SearchIcon from "@/public/assets/icons/search.svg";

const SearchSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedErrorMessagesList = useAppSelector(
    (state) => state.errors.currentErrorMessages
  );
  const storedBankFilterList = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    instantOverrideErrorMessageStore(null, dispatch);
    if (storedBankFilterList.length >= bankFilters.length) {
      instantOverrideErrorMessageStore("no banks selected to search", dispatch);
      console.log("no banks selected to search");
      return;
    }

    dispatch(setFilterIsOpen(false));
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
      body: JSON.stringify({
        addressInput,
        searchRange: storedRange,
        filteredBanks: storedBankFilterList,
      }),
      // reqTimeOut,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    const result = await response.json();
    console.log("search result: ", result);

    logErrorsToStore(result.errorMessages, dispatch);

    takeActionIfNoErrors(() => {
      dispatch(setSearchLocationPoint(result.searchPointLatLong));
      dispatch(setAtmData(result.desiredAtms));
    }, storedErrorMessagesList);

    setIsLoading(false);
    dispatch(setSearchStarted(true));
  };

  return (
    <form
      // autoComplete="off"
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between w-full gap-2 px-0 rounded-full input justify-self-end input-bordered input-primary"
    >
      <input
        id="inputAddress"
        className="w-full h-12 px-5 bg-transparent rounded-full outline-none"
        type="text"
        placeholder="location address"
        name="inputAddress"
        required
        onChange={(e) => setAddressInput(e.target.value)}
      ></input>
      <button
        disabled={isLoading}
        className={`absolute my-auto right-0 flex btn btn-circle p-0 hover:bg-transparent group ${
          !isLoading ? "btn-ghost" : "btn-disabled"
        }`}
        type="submit"
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <SearchIcon
            className="w-6 h-6 group-hover:text-primary"
            alt="Search"
          />
          //<MdSearch size={"2em"} />
        )}
      </button>
    </form>
  );
};

export default SearchSection;
