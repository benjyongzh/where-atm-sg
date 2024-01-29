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

export const sortListAccordingToKeyOnCategoryList = <
  T extends Record<string, string | number>
>(
  list: Array<T>,
  key: keyof T,
  categoryList: Record<string, number>
): Array<T> => {
  const dict: Record<string, T[]> = {};
  const uncategorisedListItems: T[] = [];
  const finalList: T[] = [];
  for (let i = 0; i < list.length; i++) {
    const item: T = list[i];
    if (typeof item[key] !== "number") {
      uncategorisedListItems.push(item);
    } else {
      const itemCategoryValue = item[key];

      //check if itemCategory exists in categoryList
      const categoryToFile: string = Object.keys(categoryList).filter(
        (category) => {
          categoryList[category] === itemCategoryValue;
        }
      )[0];

      //check if dict already has such a key
      if (Object.keys(dict).includes(categoryToFile)) {
        //dict already includes category
        dict[categoryToFile].push(item);
      } else {
        //dict does not include category yet. make new one
        dict[categoryToFile] = [item];
      }
    }
  }
  return finalList.concat(uncategorisedListItems);
};

export const extractValuesFromObjectListAccordingToKey = <
  T extends Record<string, any>
>(
  array: T[],
  key: string
): Array<any> => {
  const finalList: Array<any> = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i][key];
    finalList.push(value);
  }

  return finalList;
};
