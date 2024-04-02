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

export const cullDuplicatesBasedOnId = <T extends Record<string, any>>(
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
      return item[idKey] && typeof item[idKey] === "string";
    })
  ) {
    console.log(`item.id does not exist, or is not a string`);
    return { cleanArray: [], cleanIds: [], culledIndexes: [] };
  }

  //make set of ids
  const allIds: string[] = arr.map((item) => item[idKey]);

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
  //compile dict into finalList based on key
  const finalList: T[] = compileRecordIntoArrayAccordingToKeySorting(dict);
  //add uncategorised items to the back
  return finalList.concat(uncategorisedListItems);
};

export const compileRecordIntoArrayAccordingToKeySorting = <T extends any>(
  dict: Record<string | number, T[]>
): Array<T> => {
  const sortedDict = Object.keys(dict)
    .sort()
    .reduce(
      (sortedDict: Record<string | number, T[]>, key: string | number) => {
        sortedDict[key] = dict[key];
        return sortedDict;
      },
      {}
    );
  const finalList: Array<T> = flattenArray(Object.values(sortedDict));
  return finalList;
};

export const flattenArray = (originalArray: Array<any>): Array<any> => {
  return originalArray.reduce((stackingArray, nextItem) => {
    if (Array.isArray(nextItem)) {
      stackingArray.push(...flattenArray(nextItem));
    } else {
      stackingArray.push(nextItem);
    }
    return stackingArray;
  }, []);
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

export const executeCallbackIfEmptyArray = <T>(
  callback: Function,
  arrayList: Array<T>,
  itemName: string = "executeCallbackIfEmptyArray's arrayItem"
) => {
  console.log("arrayList: ", arrayList);
  if (arrayList.length > 0) {
    arrayList.forEach((item: T) => {
      console.log(`${itemName}: `, item);
    });
    return;
  }
  //no errors
  console.log("no arrayItems detected. executing callback...");
  callback();
};

export const arrayContainsAllContentsOfSecondArray = <T>(
  array1: Array<T>,
  array2: Array<T>
): boolean => {
  if (array2.length > array1.length) {
    //throw "array2 should be shorter than array1";
    return false;
  }

  for (let i = 0; i < array2.length; i++) {
    if (!array1.includes(array2[i])) return false;
  }

  return true;
};
