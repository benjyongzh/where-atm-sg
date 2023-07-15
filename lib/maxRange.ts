export const minSearchRange: number = 50;
export const maxSearchRange: number = 3000;

export const validateMaxRangeInput = (input: number | string) => {
  let output: number = minSearchRange;
  if (typeof input === "string") {
    output = parseInt(input);
  } else output = input;
  if (output <= minSearchRange) return minSearchRange;
  if (output >= maxSearchRange) return maxSearchRange;
  return output;
};
