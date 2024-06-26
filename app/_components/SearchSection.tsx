"use client";
import { useState } from "react";
//redux
import {
  setSearchLocationPoint,
  setFilterIsOpen,
} from "@/app/_features/settings/settingsSlice";
import {
  setAtmData,
  setSearchStarted,
} from "@/app/_features/atmData/atmDataSlice";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/reduxHooks";
import { setDisplayedErrorMessage } from "@/app/_features/errors/errorsSlice";

import { bankFilters } from "@/app/_lib/atmObject";

//utils
import {
  errorMessageQueue,
  logErrorsToStore,
  instantOverrideErrorMessageStore,
} from "@/app/_lib/errors";
import { flattenArray } from "@/app/_utils/objects";

//graphics
import SearchIcon from "@/public/assets/icons/search.svg";

//config
import {
  SEARCHADDRESS_PARAM_NAME,
  SEARCHRANGE_PARAM_NAME,
  FILTEREDBANKS_PARAM_NAME,
} from "@/app/_config/app.config";

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
    if (storedBankFilterList.length >= bankFiltersMax) {
      instantOverrideErrorMessageStore(
        { message: "no banks selected to search", severity: 1 },
        dispatch
      );
      return;
    }

    dispatch(setFilterIsOpen(false));
    setIsLoading(true);
    dispatch(setAtmData([]));

    const endpoint = `/api/search?${SEARCHADDRESS_PARAM_NAME}=${addressInput}&${SEARCHRANGE_PARAM_NAME}=${storedRange}${
      storedBankFilterList.length
        ? `&${FILTEREDBANKS_PARAM_NAME}=${encodeURIComponent(
            storedBankFilterList.toString().toLowerCase()
          )}`
        : ""
    }`;

    // Form the request for sending data to the server.
    const options = {
      method: "GET",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    const result = await response.json();
    console.log("search result: ", result);

    const loggedErrorListResult: {
      severityAcceptable: boolean;
      errorMessages: errorMessageQueue;
    } = logErrorsToStore(result.errorMessages, dispatch);

    if (loggedErrorListResult.severityAcceptable) {
      //highest severity is acceptable. carry on with actions
      dispatch(setSearchLocationPoint(result.searchPointLatLong));
      dispatch(setAtmData(result.desiredAtms));
    } else {
      dispatch(
        setDisplayedErrorMessage(loggedErrorListResult.errorMessages[0].message)
      );
    }

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
