/**
 * tips: 数组对象取值
 */
const pluck = (arr, key) => arr.map((i) => i[key]);
const simpsons = [
  { name: "lisa", age: 8 },
  { name: "homer", age: 36 },
  { name: "marge", age: 34 },
  { name: "bart", age: 10 },
];
console.log("数组对象取值", pluck(simpsons, "age")); // [8, 36, 34, 10]
/**
 * tips: 数组对象合并
 */
const combine = (a, b, prop) =>
  Object.values(
    [...a, ...b].reduce((acc, v) => {
      if (v[prop])
        acc[v[prop]] = acc[v[prop]] ? { ...acc[v[prop]], ...v } : { ...v };
      return acc;
    }, {})
  );

const x = [
  { id: 1, name: "John" },
  { id: 2, name: "Maria" },
];
const y = [{ id: 1, age: 28 }, { id: 3, age: 26 }, { age: 3 }];

console.log("对象合并", combine(x, y, "id"));

/**
 * tips: 比较对象
 */
const compactObject = (val) => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === "object" ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};
const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: "",
  g: "a",
  h: [null, false, "", true, 1, "a"],
  i: { j: 0, k: false, l: "a" },
};
console.log("比较对象", compactObject(obj));

/**
 * tips: 根据值重新定义对象
 */
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
console.log("根据值,重新定义对象", countBy([6.1, 4.2, 6.3], Math.floor)); // {4: 1, 6: 2}
console.log("根据值,重新定义对象", countBy(["one", "two", "three"], "length")); // {3: 2, 5: 1}
console.log(
  "根据值,重新定义对象",
  countBy([{ count: 5 }, { count: 10 }, { count: 5 }], (x) => x.count)
);

/**
 * tips: 数组对象过滤重复对象
 */
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((val, index) =>
    arr.every((x, y) => (index === y) === fn(val, x, index, y))
  );

console.log(
  "数组对象过滤重复对象",
  filterNonUniqueBy(
    [
      { id: 0, value: "a" },
      { id: 1, value: "b" },
      { id: 2, value: "c" },
      { id: 1, value: "d" },
      { id: 0, value: "e" },
    ],
    (a, b) => a.id === b.id
  )
);

/**
 * tips: 获取数组对象重复数据
 */
const filterUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.some((x, j) => (i !== j) === fn(v, x, i, j)));
console.log(
  "获取数组对象重复数据",
  filterUniqueBy(
    [
      { id: 0, value: "a" },
      { id: 1, value: "b" },
      { id: 2, value: "c" },
      { id: 3, value: "d" },
      { id: 0, value: "e" },
    ],
    (a, b) => a.id == b.id
  )
);

/**
 * tips: 根据值判断建名
 */

const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, val, index) => {
    const s = fn ? fn(obj[val]) : obj[val];
    acc[s] = acc[s] || [];
    acc[s].push(val);
    return acc;
  }, {});
console.log("根据值判断建名", invertKeyValues({ a: 1, b: 2, c: 1 }));

/**
 * tips: 对象数组的最小值
 */
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));
console.log(
  "对象数组的最小值",
  minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (all) => all.n)
);

/**
 * tips: 递归树形
 */
const nest = (items, id = null, link = "parent_id") =>
  items
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: nest(items, item.id, link) }));
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
];
const nestedComments = nest(comments);

console.log("递归树形", nestedComments);

/**
 * tips: 数组对象比较差值
 */
const pullBy = (arr, ...args) => {
  let fn = args.length > 1 ? args[args.length - 1] : undefined; // 判断参数类型
  fn = typeof fn === "function" ? (args.pop(), fn) : undefined; // 判断函数类型
  let argState = (Array.isArray(args[0]) ? args[0] : args).map((val) =>
    fn(val)
  ); // 根据参数判断值
  let pulled = arr.filter((val, index) => !argState.includes(fn(val)));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
};

var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullBy(myArray, [{ x: 1 }, { x: 3 }], (o) => o.x);
console.log("数组对象比较差值", myArray); // myArray = [{ x: 2 }]

/**
 * 按照条件重新组合数组对象
 */
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
const dataFilter = [
  {
    id: 1,
    name: "john",
    age: 24,
  },
  {
    id: 2,
    name: "mike",
    age: 50,
  },
];
console.log(
  "按照条件筛选数据对象",
  reducedFilter(dataFilter, ["id", "name"], (item) => item.age > 24)
);

// 获取下标
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex((el) =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};
console.log(
  "获取下标",
  sortedIndexBy([{ x: 14 }, { x: 35 }], { x: 35 }, (o) => o.x)
); // 0
const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex((el) => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};
console.log(
  "获取下标",
  sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, (o) => o.x)
); // 1
