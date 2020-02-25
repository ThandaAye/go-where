import { SortOrderDirection } from "../constants";

const sortArrayOfObjByKey = (array, key, sortOrder, caseInsensitive) => {
  const comparator = sortOrder === SortOrderDirection.ASC ? getAsc : getDesc;
  return array.sort((a, b) => {
    const upA = caseInsensitive ? a[key].toUpperCase() : a[key];
    const upB = caseInsensitive ? b[key].toUpperCase() : b[key];
    return comparator(upA, upB);
  });
};

const getAsc = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const getDesc = (a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
};

export { sortArrayOfObjByKey };