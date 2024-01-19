"use client";
import { useState } from "react";
//redux
import {
  setSearchLocationPoint,
  setFilterIsOpen,
} from "@/features/settings/settingsSlice";
import { setAtmData, setSearchStarted } from "@/features/atmData/atmDataSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

//utils
import {
  errorMessageObject,
  errorMessageStrings,
  isErrorMessageObject,
  setDisplayErrorMessage,
} from "@/lib/errors";
import { reqTimeOut } from "@/utils/fetch";

//graphics
import SearchIcon from "@/public/assets/icons/search.svg";

const SearchSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedBankFilterList = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(setFilterIsOpen(false));
    setIsLoading(true);
    setDisplayErrorMessage(null);
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
      reqTimeOut,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log("search result: ", result);

    if (!isErrorMessageObject(result)) {
      // overall fetching success
      // check for handled error messages
      result.errorMessages.forEach((error: errorMessageObject) => {
        console.log(`Client error message: `, error); //error message gotta show
      });
      dispatch(setSearchLocationPoint(result.searchPointLatLong));
      dispatch(setAtmData(result.desiredAtms));
    } else {
      //fetching failed
      console.log("Client fetching error: ", result.errorMessage); //error message gotta show
      setDisplayErrorMessage(errorMessageStrings.geocodingFailure);
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
