// import { makeStore } from "@/context/store";
import { useAppDispatch } from "@/app/_hooks/reduxHooks";
import {
  setDisplayedErrorMessage,
  setErrorMessages as setStoreErrorMessages,
  addErrorMessage,
  removeErrorMessage,
} from "@/app/_features/errors/errorsSlice";
import {
  sortListAccordingToKeyOnCategoryList,
  extractValuesFromObjectListAccordingToKey,
} from "@/app/_utils/objects";

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

/* export function setErrorMessageList(
  msg: errorMessageObject[],
  dispatchCallback: Function
) {
  const sortedMessages: string[] = extractValuesFromObjectListAccordingToKey(
    msg,
    "message"
  );
  dispatchCallback(setErrorMessages(sortedMessages));
} */

export const instantOverrideErrorMessageStore = (
  errorObj: errorMessageObject | null,
  dispatchCallback: Function
) => {
  if (errorObj === null) {
    dispatchCallback(setStoreErrorMessages([]));
    setDisplayErrorMessage(null, dispatchCallback);
  } else {
    dispatchCallback(setStoreErrorMessages([errorObj]));
    setDisplayErrorMessage(errorObj!.message, dispatchCallback);
  }
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
  dispatchCallback: Function,
  lowestAcceptableSeverity: number = 1
): { severityAcceptable: boolean; errorMessages: errorMessageQueue } => {
  if (errorMessages.length < 1)
    return { severityAcceptable: true, errorMessages: [] };
  const sortedErrorList: errorMessageQueue =
    sortListAccordingToKeyOnCategoryList(
      errorMessages,
      "severity",
      errorSeverity
    );

  console.log("sortedErrorList: ", sortedErrorList);

  const severityAcceptable: boolean = setErrorMessages(
    sortedErrorList,
    dispatchCallback,
    lowestAcceptableSeverity
  );

  return {
    severityAcceptable: severityAcceptable,
    errorMessages: sortedErrorList,
  };
};

const setErrorMessages = (
  errorList: errorMessageQueue,
  dispatchCallback: Function,
  lowestAcceptableSeverity: number
) => {
  dispatchCallback(setStoreErrorMessages(errorList));
  if (errorList[0].severity >= lowestAcceptableSeverity) {
    //errorMessage has higher severity than threshold for executing
    return false;
  }
  return true;
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
