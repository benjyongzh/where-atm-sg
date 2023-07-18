import {
  minSearchRange,
  maxSearchRange,
} from "@/features/settings/settingsSlice";

export const validateMaxRangeInput = (input: number | string) => {
  let output: number = minSearchRange;
  if (typeof input === "string") {
    output = parseInt(input);
  } else output = input;
  if (output <= minSearchRange) return minSearchRange;
  if (output >= maxSearchRange) return maxSearchRange;
  return output;
};
