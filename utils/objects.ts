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

export const cullDuplicatesBasedOnId = <T extends any>(
  arr: Array<T>,
  idKey: string
): {
  cleanArray: Array<T>;
  cleanIds: Array<string>;
  culledIndexes: Array<number>;
} => {
  if (arr.length <= 0) {
    console.log(`array is empty`);
    return { cleanArray: [], cleanIds: [], culledIndexes: [] };
  }

  // check if idKey is a valid key in arr
  if (
    !arr.every((item) => {
      return (
        item[idKey as keyof T] && typeof item[idKey as keyof T] === "string"
      );
    })
  ) {
    console.log(`item.id does not exxist, or is not a string`);
    return { cleanArray: [], cleanIds: [], culledIndexes: [] };
  }

  //make set of ids
  const allIds: string[] = arr.map((item) => item[idKey as keyof T]);

  let setIds: string[] = [];

  let culledIndexes: number[] = [];

  for (let i = 0; i < allIds.length; i++) {
    if (!setIds.includes(allIds[i])) {
      setIds.push(allIds[i]);
    } else {
      culledIndexes.push(i);
    }
  }

  const cleanArray: Array<T> = arr.filter((atm) => {
    const index = arr.indexOf(atm);
    return !culledIndexes.includes(index);
  });

  return { cleanArray, cleanIds: setIds, culledIndexes };
};
