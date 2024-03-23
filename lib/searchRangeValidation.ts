export const validateRangeInput = (
  input: string | null,
  min: number,
  max: number
): number => {
  if (input === null) return max;
  if (!isNumeric(input)) return max;
  return limitNumber(parseInt(input), min, max);
};

function isNumeric(value: string): boolean {
  return /^-?[0-9]+$/.test(value);
}

const limitNumber = (input: number, min: number, max: number): number => {
  if (input <= min) return min;
  if (input >= max) return max;
  return input;
};
