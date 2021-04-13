/*
 * 对象转数组
 */
const objectToPairs = (obj) => Object.entries(obj);
const objectToEntries = (obj) => Object.keys(obj).map((k) => [k, obj[k]]);
console.log("对象转数组", objectToPairs({ a: 1, b: 2 }));

/**
 * 对象键名重命名
 * @param {*} keysMap
 * @param {*} obj
 * @returns
 */
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  );
const obj = { name: "Bobo", job: "Front-End Master", shoeSize: 100 };
renameKeys({ name: "firstName", job: "passion" }, obj); // { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
/*
tips: 获取对象的值
*/
const forOwn = (obj, fn) =>
  Object.keys(obj).forEach((key) => fn(obj[key], key, obj));

forOwn({ foo: "bar", a: 1 }, (val) => console.log("获取对象的值", val));

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

// pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter((k) => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

// pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')

/**
 * tips: 深度克隆 递归循环
 */
const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach((key) => {
    clone[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
  });
  if (Array.isArray(clone)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const a = { foo: "bar", obj: { a: 1, b: 2, c: { d: "hello" } } };
const b = deepClone(a);
console.log("深度克隆:", b);

/**
 * tips: 深度获取值
 */
const deepMapKeys = (obj, fn) => {
  if (Array.isArray(obj)) {
    return obj.map((val) => deepMapKeys(val, fn));
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((acc, current) => {
      const key = fn(current);
      const val = obj[current];
      acc[key] =
        val !== null && typeof val === "object" ? deepMapKeys(val, fn) : val;
      return acc;
    }, {});
  }
  return obj;
};
const obj = {
  foo: "1",
  nested: {
    child: {
      withArray: [
        {
          grandChild: ["hello"],
        },
      ],
    },
  },
};
const upperKeysObj = deepMapKeys(obj, (key) => key.toUpperCase());
// const hasKeysObj = deepMapKeys(obj, (key) => key === "child")
console.log("深度获取值:", upperKeysObj);

/**
 * tips: 获取深度对象的属性值
 * 1. 判断是否有值
 * 2. 获取每个值 reduce , 递归调用
 */
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== "") return acc;
        if (typeof val === "object") return dig(val, target);
      }, "");

const data = {
  level1: {
    level2: {
      level3: "some data",
    },
  },
};

console.log("tips: 获取深度对象的属性值", dig(data, "level3"));

/**
 * tips: 对象扁平化
 */
const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
console.log("对象扁平化", flattenObject({ a: { b: { c: 1 } }, d: 1 })); // { 'a.b.c': 1, d: 1 }

/**
 * tips: 根据值获取对象的名
 */
const findKeys = (obj, val) =>
  Object.keys(obj).filter((key) => obj[key] === val);
const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
console.log("根据值获取对象的名", findKeys(ages, 20)); // [ 'Leo', 'Jane' ]

/**
 * tips: 格式化建名
 */
const lowercaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
const myObj = { Name: "Adam", sUrnAME: "Smith" };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};
console.log("格式化建名", myObjLower);

/**
 * tips: 对象比对
 */
const matches = (obj, source) =>
  Object.keys(source).every(
    (key) => obj.hasOwnProperty(key) && obj[key] === source[key]
  );
console.log(
  "对象比对",
  matches({ age: 25, hair: "long", beard: true }, { hair: "long", beard: true })
); // true

/**
 * tips: 对象合并
 */
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );
const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1,
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: "foo",
};
console.log("对象合并", merge(object, other));
// { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

/**
 * tips: 对象转查询字符串
 */
const objectToQueryString = (queryParameters) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce(
        (queryString, [key, val], index) => {
          const symbol = queryString.length === 0 ? "?" : "&";
          queryString +=
            typeof val === "string" ? `${symbol}${key}=${val}` : "";
          return queryString;
        },
        ""
      )
    : "";
};
console.log(
  "对象转查询字符串",
  objectToQueryString({ page: "1", size: "2kg", key: undefined })
);

/**
 * tips: 删除对象一个元素
 */
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, val) => ((acc[val] = obj[val]), acc), {});
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter((k) => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
console.log("删除对象一个元素", omit({ a: 1, b: "2", c: 3 }, ["b"]));
console.log(
  "获取对象一个值",
  omitBy({ a: 1, b: "2", c: 3 }, (x) => typeof x === "number")
);

// 克隆对象
const shallowClone = (obj) => Object.assign({}, obj);

// 对象转二维数组
const toPairs = (obj) =>
  obj[Symbol.iterator] instanceof Function && obj.entries instanceof Function
    ? Array.from(obj.entries())
    : Object.entries(obj);

toPairs({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]

// 判断是否存在属性
const truthCheckCollection = (collection, pre) =>
  collection.every((obj) => obj[pre]);
truthCheckCollection(
  [
    { user: "Tinky-Winky", sex: "male" },
    { user: "Dipsy", sex: "male" },
  ],
  "sex"
); // true
