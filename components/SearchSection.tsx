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
  errorMessageQueue,
  logErrorsToStore,
  instantOverrideErrorMessageStore,
} from "@/lib/errors";
import {
  flattenArray,
  extractValuesFromObjectListAccordingToKey,
  executeCallbackIfEmptyArray,
} from "@/utils/objects";

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

    //check if bank filter is valid
    const bankFiltersMax: number = flattenArray(
      bankFilters.map((filterObject) => filterObject.banks)
    ).length;
    // console.log("bankFiltersTotalCount: ", bankFiltersMax);
    // console.log("storedBankFilterListCount: ", storedBankFilterList.length);
    if (storedBankFilterList.length >= bankFiltersMax) {
      instantOverrideErrorMessageStore("no banks selected to search", dispatch);
      return;
    }

    dispatch(setFilterIsOpen(false));
    setIsLoading(true);
    //should validate and sanitize addressInput string here first
    //TODO clear atmList items here. map should default to showing zero results. (when changing atam filter selection into one without results)
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

    const loggedErrorList: errorMessageQueue = logErrorsToStore(
      result.errorMessages,
      dispatch
    );

    const sortedMessages: string[] = extractValuesFromObjectListAccordingToKey(
      loggedErrorList,
      "message"
    );

    executeCallbackIfEmptyArray(() => {
      //TODO ends up disallowing data to be shown if there are any banks with errors
      dispatch(setSearchLocationPoint(result.searchPointLatLong));
      dispatch(setAtmData(result.desiredAtms));
    }, sortedMessages);

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
