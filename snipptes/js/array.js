/**
 * 创建随机数组
 * @param {*} min
 * @param {*} max
 * @param {*} n
 * @returns
 */
const randomInArrayRang = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

console.log("随机数组n", randomInArrayRang(10, 30, 10));

/**
 * 数组中的最大值和最小值
 * @param {*} arr
 * @returns
 */
const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));

reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3

/**
 * 对象转数组
 * @param {*} arr
 * @returns
 */
const objectFromPairs = (arr) =>
  arr.reduce((acc, [key, val]) => ((acc[key] = val), acc), {});
console.log(
  "对象转数组",
  objectFromPairs([
    ["a", 1],
    ["b", 2],
  ])
);

/**
 * 数组前两项的和
 * @param  {...any} nums
 * @returns
 */
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);

console.log(accumulate(1, 2, 3, 4)); // [1, 3, 6, 10]
console.log(accumulate(...[1, 2, 3, 4])); // [1, 3, 6, 10]
console.log("=========================");

/**
 * 数组组合
 * @param {*} a
 * @param {*} b
 * @returns
 */
const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map((y) => [x, y])), []);
console.log(xProd([1, 2], ["a", "b"])); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
console.log("=========================");

/**
 * 数组筛选-1
 * @param {*} array
 * @param {*} pred
 * @returns
 */
const rejectFilter = (array, pred) => array.filter((...args) => !pred(...args));
rejectFilter(["Apple", "Pear", "Kiwi", "Banana"], (word) => word.length > 4); // ['Pear', 'Kiwi']
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
remove([1, 2, 3, 4], (n) => n % 2 === 0); // [2, 4]

/**
 * tips: 数组中每个值 === fn(arr[0])
 */
const allEqualBy = (arr, fn) => {
  const eql = fn(arr[0]);
  return arr.every((val) => fn(val) === eql);
};
console.log("每个值 === fn(arr[0])", allEqualBy([1.1, 1.2, 1.3], Math.round)); // true
console.log("每个值 === fn(arr[0])", allEqualBy([1.1, 1.3, 1.6], Math.round)); // false
console.log("=========================");
/**
 * tips: 数组中每个值 === fn(arr[i])
 */
const allUniqueBy = (arr, fn) => arr.length === new Set(arr.map(fn)).size;
console.log("每个值 === fn(arr[i])", allUniqueBy([1.2, 2.4, 2.9], Math.round)); // true
console.log("每个值 === fn(arr[i])", allUniqueBy([1.2, 2.3, 2.4], Math.round)); // false
console.log("=========================");
/**
 * tips: 数组中是否有重复值
 */
const allUnique = (arr) => arr.length === new Set(arr).size;
console.log("数组中是否有重复值", allUnique([1, 2, 3, 4])); // true
console.log("数组中是否有重复值", allUnique([1, 1, 2, 3])); // false
console.log("=========================");

/**
 * tips: 单数组拆分多数组
 */
const aperture = (n, arr) =>
  n > arr.length
    ? []
    : arr.slice(n - 1).map((val, index) => arr.slice(index, index + n));
console.log("单数组拆分多数组", aperture(2, [1, 2, 3, 4]));

/**
 * tips: 数组转 cvs
 */
const arrayToCSV = (arr, delimiter = ",") =>
  arr
    .map((v) =>
      v
        .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter)
    )
    .join("\n");
console.log(
  "数组转 cvs：",
  arrayToCSV([
    ["a", "b"],
    ["c", "d"],
  ])
);

/**
 * tips: csv 转数组
 */
const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((v) => v.split(delimiter));
console.log("csv 转数组：", CSVToArray("col1,col2\na,b\nc,d", ",", true));

/**
 * tips: 数组平铺
 */
const deepFlatten = (arr) =>
  [].concat(
    ...arr.map((item) => (Array.isArray(item) ? deepFlatten(item) : item))
  );
console.log("数组平铺:", deepFlatten([1, [2], [[3], 4], 5]));
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );
console.log("数组平铺:", flatten([1, [2, [3, [4, 5], 6], 7], 8], 2));
/**
 *tips: 数组比对, b 中的数据是否存在于 a 中，比对后取 a 中的数据差值
 * */
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
console.log("数组比对：", difference([1, 2, 3, 4, 3], [1, 2, 4]));

/**
 * tips: 数组比对
 */
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn)); // 处理 b 中的每一个值
  return a.map(fn).filter((el) => !s.has(el)); // 获取到不同的值
};
console.log(
  "数组比对获取到不同的值：",
  differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (item) => item.x)
);

/**
 * tips: 数组中数据统计
 */
const frequencies = (arr) =>
  arr.reduce((acc, val) => {
    acc[val] = acc[val] ? acc[val] + 1 : 1;
    return acc;
  }, {});
console.log("数组统计", frequencies(["a", "b", "a", "c", "a", "a", "b"]));

/**
 * tips:数组反转
 */
const forEachRight = (arr, callback) => arr.slice().reverse().forEach(callback);
let _array = [];
forEachRight([1, 2, 3, 4], (val) => _array.push(val));
console.log("数组反转", _array);

/**
 * tips: 获取重复的数据
 */
const filterUnique = (arr) =>
  [...new Set(arr)].filter((val) => arr.indexOf(val) !== arr.lastIndexOf(val));

console.log("获取重复数据", filterUnique([1, 2, 2, 3, 4, 4, 5]));

/**
 * tips: 去掉重复数据
 */
const filterNonUnique = (arr) =>
  [...new Set(arr)].filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
console.log("去掉重复数据", filterNonUnique([1, 2, 2, 3, 4, 4, 5]));

/**
 * tips: 创建空数组
 */
const generateItems = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
console.log("创建空数组", generateItems(10, Math.random));

/**
 * tips: 数组中插入值
 */
const insertAt = (arr, i, ...val) => {
  arr.splice(i + 1, 0, ...val);
  return arr;
};
let myArray = [1, 2, 3, 4];
insertAt(myArray, 2, 5);
console.log("数组中插入值", myArray);

/**
 * tips: 数组添加元素
 */
const pullArray = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
};
let myArray_1 = ["a", "b", "c", "a", "b", "c"];
pullArray(myArray_1, "a", "c");
console.log("数组添加元素", myArray_1);

/**
 * tips: 数组分类
 */
const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val, index) => {
      acc[val] = (acc[val] || []).concat(arr[index]);
      return acc;
    }, {});

console.log("数组分类", groupBy([6.1, 4.2, 6.3], Math.floor));

/**
 * tips: 数组是否有重复数据
 */
const hasDuplicates = (arr) => new Set(arr).size !== arr.length;
console.log("数组是否有重复数据", hasDuplicates([0, 1, 1, 2]));

/**
 * tips: 数组是否相同内容
 */
const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter((e) => e === v).length !== b.filter((e) => e === v).length)
      return false;
  return true;
};
const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some((e) => e === v) ||
      a.filter((e) => e === v).length > b.filter((e) => e === v).length
    )
      return false;
  }
  return true;
};
console.log("数组是否相同内容", haveSameContents([1, 2, 4], [2, 4, 1]));
console.log("数组是否有相同内容", isContainedIn([1, 4], [2, 4, 1])); // true
/**
 * tips: 数组全部包含
 */
const includesAll = (arr, values) => values.every((v) => arr.includes(v));
console.log("数组全部包含", includesAll([1, 2, 3, 4], [1, 4]));

/**
 * tips: 数组是否有重复项
 */
const includesAny = (arr, values) => values.some((v) => arr.includes(v));
console.log("数组是否有重复项", includesAny([1, 2, 3, 4], [2, 9]));

/**
 * tips: 返回下标，类型为数组。 匹配相同的值
 */
const indexOfAll = (arr, val) =>
  arr.reduce((acc, v, index) => (v === val ? [...acc, index] : acc), []);
console.log("返回匹配到的数组下标", indexOfAll([1, 2, 3, 1, 2, 3], 1));

/**
 * tips: 返回除了最后一个元素的数组
 */
const initial = (arr) => arr.slice(0, -1);
console.log("返回除了最后一个元素的数组", initial([1, 2, 3]));

/**
 * tips: 创建一个空数组
 */
const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);
console.log("创建一个空数组填充", initializeArrayWithValues(5, 2));

/**
 * tips: 初始化多个二维数组
 */
const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
console.log("初始化多个二维数组", initialize2DArray(2, 2, 0));

/**
 * tips: 创建一个间隔数组
 */
const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (_, i) => i * step + start
  );

const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );
console.log("创建一个间隔左数组", initializeArrayWithRange(7, 3));
console.log("创建一个间隔右数组", initializeArrayWithRangeRight(5));

/**
 * tips: 提取数组中的相同值
 */
const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter((x) => s.has(x));
};
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return [...new Set(a)].filter((x) => s.has(fn(x)));
};
console.log("提取数组中的相同值", intersection([1, 2, 3], [4, 3, 2]));
console.log(
  "提取数组中对象的相同值",
  intersectionBy(
    [{ title: "Apple" }, { title: "Orange" }],
    [{ title: "Orange" }, { title: "Melon" }],
    (x) => x.title
  )
);

/**
 * tips: 是否 isArrayLike
 */
const isArrayLike = (obj) =>
  obj != null && typeof obj[Symbol.iterator] === "function";

// console.log(
//   "是否 isArrayLike",
//   isArrayLike(document.querySelectorAll(".className"))
// )

/**
 * tips: join 数组拼接
 */
const join = (arr, separator = ",", end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
        ? acc + val
        : acc + val + separator,
    ""
  );
console.log("路径数组拼接", join(["pen", "pineapple", "apple", "pen"], ","));

/**
 * tips: 数组中最小的几个数
 */
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
console.log("数组中最小的几个数", minN([1, 2, 3], 2));

const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

/**
 * tips: 数组取元素
 */
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
console.log("数组取元素", nthElement(["a", "b", "c"], 1));
/**
 * tips: 数组筛选
 */
const negate = (func) => (...args) => !func(...args);
console.log("数组筛选", [1, 2, 3, 4, 5, 6].filter(negate((n) => n % 2 === 0)));

/**
 * tips: 数组移动元素
 */
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
console.log("数组移动元素", offset([1, 2, 3, 4, 5], 2));

/**
 * tips: 数组值拆分
 */
const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) =>
      pullArr.includes(v) ? removed.push(v) : v
    ),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach((v) => arr.push(v));
  return removed;
};
/**
 * tips: 数组下标拆分
 */
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
  return removed;
};
let myArrayPull = ["a", "b", "c", "d"];
let _pulled = pullAtIndex(myArrayPull, ["b", "d"]);
console.log("数组拆分1", myArrayPull);

/**
 * tips: 删除数组中的多个值
 */
const pullMore = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
};
let myArrayPullMore = ["a", "b", "c", "a", "b", "c"];
pullMore(myArrayPullMore, "a", "c");
console.log("删除数组中的多个值", myArrayPullMore); //  [ 'b', 'b' ]

/**
 * tips: 获取数组的所有排列组合
 */
const permutations = (arr) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
};
// [ [1, 33, 5], [1, 5, 33], [33, 1, 5], [33, 5, 1], [5, 1, 33], [5, 33, 1] ]
console.log("获取数组的所有排列组合", permutations([1, 33, 5]));

/**
 * tips: 数组中取出随机一个数
 */
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
sample([3, 7, 9, 11]); // 9

/**
 * 替换数组元素
 * @param {*} arr
 * @param {*} index
 * @param {*} delCount
 * @param  {...any} elements
 * @returns
 */
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

const names = ["alpha", "bravo", "charlie"];
const namesAndDelta = shank(names, 1, 0, "delta");
// [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']

// 洗牌算法
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]

// 数组-提取相同值、不同的值
const similarity = (arr, values) => arr.filter((v) => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1, 2]

const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter((x) => !sB.has(x)), ...b.filter((x) => !sA.has(x))];
};
symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]

const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map((v) => fn(v))),
    sB = new Set(b.map((v) => fn(v)));
  return [
    ...a.filter((x) => !sB.has(fn(x))),
    ...b.filter((x) => !sA.has(fn(x))),
  ];
};
symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
symmetricDifferenceBy(
  [{ id: 1 }, { id: 2 }, { id: 3 }],
  [{ id: 1 }, { id: 2 }, { id: 4 }],
  (i) => i.id
);
// [{ id: 3 }, { id: 4 }]

// 数组-数组、对象、字符串大小
const size = (val) =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === "object"
    ? val.size || val.length || Object.keys(val).length
    : typeof val === "string"
    ? new Blob([val]).size
    : 0;
// size([1, 2, 3, 4, 5]); // 5
// size("size"); // 4
// size({ one: 1, two: 2, three: 3 }); // 3

// 数组-toHash
const toHash = (object, key) =>
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );
toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
// 数组-排序
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 数组-取平均数
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};
standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true); // 12.29899614287479 (population)

// 数组-求和
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10
const sumBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0);
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (x) => x.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 20

/**
 * tips: 字符串-数组组合多少种
 * @param {*} str
 * @returns
 */
const stringPermutations = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};
stringPermutations("abc"); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

// 数组-全部匹配
const subSet = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...sA].every((v) => sB.has(v));
};
subSet(new Set([1, 2]), new Set([1, 2, 3, 4])); // true
subSet(new Set([1, 5]), new Set([1, 2, 3, 4])); // false

const superSet = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...sB].every((v) => sA.has(v));
};
superSet(new Set([1, 2, 3, 4]), new Set([1, 2])); // true
superSet(new Set([1, 2, 3, 4]), new Set([1, 5])); // false

// 数组-取值
const take = (arr, n = 1) => arr.slice(0, n);
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []

const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};
takeWhile([1, 2, 3, 4], (n) => n < 3); // [1, 2]

const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};
takeUntil([1, 2, 3, 4], (n) => n >= 3); // [1, 2]

const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};
takeRightWhile([1, 2, 3, 4], (n) => n >= 3); // [3, 4]

const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};
takeRightUntil([1, 2, 3, 4], (n) => n < 3); // [3, 4]

const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
takeRight([1, 2, 3], 2); // [ 2, 3 ]
takeRight([1, 2, 3]); // [3]

const tail = (arr) => (arr.length > 1 ? arr.slice(1) : arr);
tail([1, 2, 3]); // [2, 3]
tail([1]); // [1]

// tips: 字符串数组格式 转换成 对象模式
const jsList = [
  "es5:forEach",
  "es5:map",
  "es5:filter",
  "es6:find",
  "es6:findIndex",
  "add",
];
// const jsObj = {
//   es5: ["forEach", "map", "filter"],
//   es6: ["find", "findIndex"],
// };

// es5 拆分
const jsObj = {};
for (let index = 0; index < jsList.length; index++) {
  const element = jsList[index];
  const [version, apiName] = element.split(":");
  if (apiName) {
    if (!jsObj[version]) {
      jsObj[version] = [];
    } else {
      jsObj[version].push(apiName);
    }
  }
}
console.log("jsObj===>", jsObj);

// es6 拆分
const jsObj1 = jsList
  .map((item) => item.split(":"))
  .filter((arr) => arr.length === 2)
  .reduce((obj, item) => {
    const [version, apiName] = item;
    return {
      ...obj,
      [version]: [...(obj[version] || []), apiName],
    };
  }, {});

console.log("jsObj1===>", jsObj1);
