// import { makeStore } from "@/context/store";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  setDisplayedErrorMessage,
  setErrorMessages,
  addErrorMessage,
  removeErrorMessage,
} from "@/features/errors/errorsSlice";
import { EnumType } from "typescript";
import {
  sortListAccordingToKeyOnCategoryList,
  extractValuesFromObjectListAccordingToKey,
} from "@/utils/objects";

export type errorMessageQueue = errorMessageObject[];

export const errorSeverity: Record<string, number> = {
  OK: 0,
  WARNING: 1,
  CRITICAL: 2,
};

export type errorMessageObject = {
  message: string;
  severity: (typeof errorSeverity)[keyof typeof errorSeverity];
};

export function isErrorMessageObject(arg: any): arg is errorMessageQueue {
  return (
    arg &&
    arg.displayedErrorMessage &&
    (typeof arg.displayedErrorMessage === "string" ||
      typeof arg.displayedErrorMessage === null) &&
    arg.currentErrorMessages &&
    typeof arg.currentErrorMessages === "object"
  );
}

export function setDisplayErrorMessage(msg: errorMessageObject | null) {
  const dispatch = useAppDispatch();
  if (typeof msg === null) {
    dispatch(setDisplayedErrorMessage(msg as null));
    return;
  }
  const firstMessage: string = extractValuesFromObjectListAccordingToKey(
    [msg as errorMessageObject],
    "severity"
  )[0];
  dispatch(setDisplayedErrorMessage(firstMessage));
}

export function setErrorMessageList(msg: errorMessageObject[]) {
  const dispatch = useAppDispatch();
  const sortedMessages: string[] = extractValuesFromObjectListAccordingToKey(
    msg,
    "severity"
  );
  dispatch(setErrorMessages(sortedMessages));
}

export function addToErrorMessageList(msg: string) {
  const dispatch = useAppDispatch();
  dispatch(addErrorMessage(msg));
}

export function removeFromErrorMessageList(msg: string) {
  const dispatch = useAppDispatch();
  dispatch(removeErrorMessage(msg));
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

export const logErrorsToStore = (errorMessages: errorMessageQueue) => {
  const sortedErrorList: errorMessageQueue =
    sortListAccordingToKeyOnCategoryList(
      errorMessages,
      "severity",
      errorSeverity
    );

  setErrorMessageList(sortedErrorList);
  setDisplayErrorMessage(sortedErrorList[0]);
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

class errorMessagesContainer {
  private static instance: errorMessagesContainer;
  private messages: string[] = [];
  private constructor() {}
  public static getInstance(): errorMessagesContainer {
    if (!errorMessagesContainer.instance) {
      errorMessagesContainer.instance = new errorMessagesContainer();
    }
    return errorMessagesContainer.instance;
  }

  addMessage(error: string) {
    this.messages.push(error);
    console.log("Error Messages Container: error message added: ", error);
    console.log("Error Messages Container: ", this.messages);
  }

  removeMessage(error: string) {
    this.messages = this.messages.filter((errorMsg) => errorMsg != error);
    console.log("Error Messages Container: error message removed: ", error);
    console.log("Error Messages Container: ", this.messages);
  }

  get allMessages() {
    return this.messages;
  }
}

export const errorMessages = errorMessagesContainer.getInstance();
