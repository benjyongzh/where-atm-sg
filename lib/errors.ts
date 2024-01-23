import { store } from "@/context/store";
import {
  setDisplayedErrorMessage,
  setErrorMessages,
  addErrorMessage,
  removeErrorMessage,
} from "@/features/errors/errorsSlice";

export type errorMessageObject = {
  errorMessage: string;
};

export function isErrorMessageObject(arg: any): arg is errorMessageObject {
  return arg && arg.errorMessage && typeof arg.errorMessage === "string";
}

export function setDisplayErrorMessage(msg: string | null) {
  store.dispatch(setDisplayedErrorMessage(msg));
}

export function setErrorMessageList(msg: string[]) {
  store.dispatch(setErrorMessages(msg));
}

export function addToErrorMessageList(msg: string) {
  store.dispatch(addErrorMessage(msg));
}

export function removeFromErrorMessageList(msg: string) {
  store.dispatch(removeErrorMessage(msg));
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

export const takeActionIfNoErrors = (action: Function, errorList: string[]) => {
  if (errorList.length > 0) {
    errorList.forEach((error: string) => {
      console.log(`Error message: `, error); //error message gotta show
    });
    return;
  }
  //no errors
  action();
};
