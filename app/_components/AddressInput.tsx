"use client";
import { useState } from "react";
// import { validateMaxRangeInput } from "@/lib/maxRange";
import { setSearchLocationPoint } from "@/app/_features/settings/settingsSlice";
import { useAppDispatch } from "@/app/_hooks/reduxHooks";
import { IGeoCode } from "@/app/_features/googleAPI/geocoder";

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
      lng: result.geometry.location.lng,
    };

    if (props.updateReduxOnInput) {
      dispatch(setSearchLocationPoint(searchPos));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full gap-4 p-5 sm:flex-row section"
    >
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
          onChange={(e) => handleChange(e.target.value)}
          value={addressInput}
        ></input>
      </div>
      <button className="w-full btn btn-primary sm:w-auto" type="submit">
        Search
      </button>
    </form>
  );
};

export default AddressInput;
