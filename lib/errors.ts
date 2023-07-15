export type errorMessageObject = {
  errorMessage: string;
};

export function isErrorMessageObject(arg: any): arg is errorMessageObject {
  return arg && arg.errorMessage && typeof arg.errorMessage === "string";
}
