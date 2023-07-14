"use client";
import { useState } from "react";
// import { validateMaxRangeInput } from "@/lib/maxRange";
import {
  setSearchLocationPoint,
  IGeoCode,
} from "@/features/settings/settingsSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

const AddressInput = (props: { updateReduxOnInput: boolean }) => {
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    setAddressInput(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const endpoint = "/api/geocode";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(addressInput),
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    const searchPos: IGeoCode = {
      lat: result.geometry.location.lat,
      long: result.geometry.location.lng,
    };

    if (props.updateReduxOnInput) {
      dispatch(setSearchLocationPoint(searchPos));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full"
    >
      <div className="flex items-center justify-center w-full gap-3 p-4">
        <label htmlFor="inputAddress">Search Address</label>
        <input
          id="inputAddress"
          className=""
          type="text"
          placeholder="location address"
          name="inputAddress"
          required
          onChange={(e) => handleChange(e.target.value)}
          value={addressInput}
        ></input>
      </div>
      <button className="px-3 py-1 rounded-md bg-sky-500" type="submit">
        Search
      </button>
    </form>
  );
};

export default AddressInput;
