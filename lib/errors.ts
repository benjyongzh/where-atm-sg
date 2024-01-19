import { store } from "@/context/store";
import { setDisplayedErrorMessage } from "@/features/errors/errorsSlice";

export type errorMessageObject = {
  errorMessage: string;
};

export function isErrorMessageObject(arg: any): arg is errorMessageObject {
  return arg && arg.errorMessage && typeof arg.errorMessage === "string";
}

export function setDisplayErrorMessage(msg: string | null) {
  store.dispatch(setDisplayedErrorMessage(msg));
}

export const errorMessageStrings = {
  noResultsFound: "No results",
  geocodingAPIFailure: "Failed to reach geocoding service",
  geocodingDataFailure: "Error in geocoding data",
  placesAPIFailure: "Failed to reach server for ATM data",
  placesDataFailure: "Error in ATM data",
  directionsAPIFailure: "Failed to reach server for directions",
  directionsDataFailure: "Error in directions data",
  searchAPIFailure: "Failed to reach server for search",
  searchDataFailure: "Error in searched data",
};
