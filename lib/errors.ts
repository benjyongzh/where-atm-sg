import { store } from "@/context/store";
import { setDisplayedErrorMessage } from "@/features/errors/errorsSlice";

export type errorMessageObject = {
  errorMessage: string;
};

export function isErrorMessageObject(arg: any): arg is errorMessageObject {
  return arg && arg.errorMessage && typeof arg.errorMessage === "string";
}

export function setDisplayErrorMessage(msg:string | null){
  store.dispatch(setDisplayedErrorMessage(msg))
}