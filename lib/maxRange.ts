import { SEARCH_RANGE_MIN, SEARCH_RANGE_MAX } from "@/config/app.config";

export const validateMaxRangeInput = (input: number | string) => {
  let output: number = SEARCH_RANGE_MIN;
  if (typeof input === "string") {
    output = parseInt(input);
  } else output = input;
  if (output <= SEARCH_RANGE_MIN) return SEARCH_RANGE_MIN;
  if (output >= SEARCH_RANGE_MAX) return SEARCH_RANGE_MAX;
  return output;
};
