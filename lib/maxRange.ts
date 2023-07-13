const minRange: number = 10;
const maxRange: number = 3000;

export const validateMaxRangeInput = (input: number | string) => {
  let output: number = minRange;
  if (typeof input === "string") {
    output = parseInt(input);
  } else output = input;
  if (output <= minRange) return minRange;
  if (output >= maxRange) return maxRange;
  return output;
};
