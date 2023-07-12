export const isEmptyObj = (obj: any) => {
  return JSON.stringify(obj) === "{}" || obj === null || obj === undefined;
};

export const isArrayOfType = (arr: Array<any>, desiredType: any) => {
  if (!Array.isArray(arr)) return false;

  return (
    arr.length > 0 &&
    arr.every((value) => {
      return typeof value === desiredType;
    })
  );
};

export const isArrayOfInterface = (
  arr: Array<any>,
  interfaceCheckCallback: Function
) => {
  if (arr.length <= 0) return false;

  return arr.every((value) => {
    // if (interfaceCheckCallback(value) !== true) console.log(value);
    return interfaceCheckCallback(value);
  });
};
