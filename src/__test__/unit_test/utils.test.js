import { sortArrayOfObjByKey } from "../../utils";
import { SortOrderDirection } from "../../constants";

const sortArrayOfObjByKeyData = {
  test1: {
    data: {
      array: [{ 'name': 'Orange', 'value': 20 }, { 'name': 'Apple', 'value': 15 }, { 'name': 'Grapes', 'value': 50 }],
      key: 'name',
      sortOrder: SortOrderDirection.ASC,
      caseInsensitive: true
    },
    expect: [{ 'name': 'Apple', 'value': 15 }, { 'name': 'Grapes', 'value': 50 }, { 'name': 'Orange', 'value': 20 }]
  },
  test2: {
    data: {
      array: [{ 'name': 'Orange', 'value': 20 }, { 'name': 'Apple', 'value': 15 }, { 'name': 'Grapes', 'value': 50 }],
      key: 'name',
      sortOrder: SortOrderDirection.DESC,
      caseInsensitive: true
    },
    expect: [{ 'name': 'Orange', 'value': 20 }, { 'name': 'Grapes', 'value': 50 }, { 'name': 'Apple', 'value': 15 },]
  },
  test3: {
    data: {
      array: [{ 'name': 'Orange', 'value': 20 }, { 'name': 'Apple', 'value': 15 }, { 'name': 'Grapes', 'value': 50 }],
      key: 'value',
      sortOrder: SortOrderDirection.ASC,
      caseInsensitive: false
    },
    expect: [{ 'name': 'Apple', 'value': 15 }, { 'name': 'Orange', 'value': 20 }, { 'name': 'Grapes', 'value': 50 }]
  }
};

it('Test 1: sortArrayOfObjByKey(array, key, sortOrder, caseInsensitive)', () => {
  const data = sortArrayOfObjByKeyData.test1.data;
  const expectData = sortArrayOfObjByKeyData.test1.expect;
  expect(sortArrayOfObjByKey(data.array, data.key, data.sortOrder, data.caseInsensitive)).toEqual(expectData);
});

it('Test 2: sortArrayOfObjByKey(array, key, sortOrder, caseInsensitive)', () => {
  const data = sortArrayOfObjByKeyData.test2.data;
  const expectData = sortArrayOfObjByKeyData.test2.expect;
  expect(sortArrayOfObjByKey(data.array, data.key, data.sortOrder, data.caseInsensitive)).toEqual(expectData);
});

it('Test 3: sortArrayOfObjByKey(array, key, sortOrder, caseInsensitive)', () => {
  const data = sortArrayOfObjByKeyData.test3.data;
  const expectData = sortArrayOfObjByKeyData.test3.expect;
  expect(sortArrayOfObjByKey(data.array, data.key, data.sortOrder, data.caseInsensitive)).toEqual(expectData);
});