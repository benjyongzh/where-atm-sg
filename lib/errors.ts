// import { makeStore } from "@/context/store";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  setDisplayedErrorMessage,
  setErrorMessages,
  addErrorMessage,
  removeErrorMessage,
} from "@/features/errors/errorsSlice";
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

export function setDisplayErrorMessage(
  msg: string | null,
  dispatchCallback: Function
) {
  console.log("setDisplayErrorMessage msg: ", msg);
  dispatchCallback(setDisplayedErrorMessage(msg));
}

export function setErrorMessageList(
  msg: errorMessageObject[],
  dispatchCallback: Function
) {
  const sortedMessages: string[] = extractValuesFromObjectListAccordingToKey(
    msg,
    "message"
  );
  dispatchCallback(setErrorMessages(sortedMessages));
}

export const instantOverrideErrorMessageStore = (
  message: string | null,
  dispatchCallback: Function
) => {
  if (message === null) {
    dispatchCallback(setErrorMessages([]));
  } else {
    dispatchCallback(setErrorMessages([message]));
  }
  setDisplayErrorMessage(message, dispatchCallback);
};

/* export function addToErrorMessageList(msg: string, dispatchCallback: Function) {
  dispatchCallback(addErrorMessage(msg));
} */

/* export function removeFromErrorMessageList(
  msg: string,
  dispatchCallback: Function
) {
  dispatchCallback(removeErrorMessage(msg));
} */

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

export const logErrorsToStore = (
  errorMessages: errorMessageQueue,
  dispatchCallback: Function
): errorMessageQueue => {
  if (errorMessages.length < 1) return [];
  const sortedErrorList: errorMessageQueue =
    sortListAccordingToKeyOnCategoryList(
      errorMessages,
      "severity",
      errorSeverity
    );

  console.log("sortedErrorList: ", sortedErrorList);

  setErrorMessageList(sortedErrorList, dispatchCallback);
  setDisplayErrorMessage(sortedErrorList[0].message, dispatchCallback);
  return sortedErrorList;
};

export const takeActionIfNoErrors = (action: Function, errorList: string[]) => {
  console.log("errorList: ", errorList);
  if (errorList.length > 0) {
    errorList.forEach((error: string) => {
      console.log(`Error message: `, error);
    });
    return;
  }
  //no errors
  console.log("no errors detected. executing action...");
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
