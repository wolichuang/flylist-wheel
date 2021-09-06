/**
 * tips: 数组求和
 */
const r = [1, 2, 3, 4].reduce((pre, cur) => {
  return pre + cur;
}, 0);
console.log(r);

/**
 * tips: 手写
 */
Array.prototype.myReduce = function (callback) {
  var arr = this;
  var len = arr.length;
  var value = arguments[1] || arr[0]; // 如果没有第二个参数 就取数组第一个值
  var init = arguments[1] ? 0 : 1; // ?
  for (var i = init; i < len; i++) {
    value = callback(value, arr[i], i, arr);
  }
  return value;
};

const t = [1, 2, 3, 4].myReduce((pre, cur) => {
  return pre + cur;
}, 0);
console.log(t);

/**
 * msdn
 */
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, "reduce", {
    value: function (callback, initialValue) {
      if (this === null) {
        throw new TypeError(
          "Array.prototype.reduce called on null or undefined"
        );
      }
      if (typeof callback !== "function") {
        throw new TypeError(callback + "is not a function");
      }
      var o = Object(this);
      var len = o.length >>> 0;
      var k = 0;
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError("reduce of empty array with no initial value");
        }
        value = o[k++];
      }

      while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o);
        }
        k++;
      }
      return value;
    },
  });
}

/**
 * tips: 数组扁平化
 */

var arr = [1, 2, 3, 4, 5, ["zhangsna", "lisi", ["ss", "ss", ["ss", "ss"]]]];

const _flat = (arr) =>
  arr.reduce(function (pre, cur) {
    if (Object.prototype.toString.call(cur) === "[object Array]") {
      return [...pre, ..._flat(cur)];
    } else {
      return [...pre, cur];
    }
  }, []);
console.log(_flat(arr));

/**
 * tips: 数组拆分
 */
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, index) => (acc[filter[index] ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);
console.log(
  bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true])
);
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);
console.log(bifurcateBy(["beep", "boop", "foo", "bar"], (x) => x[0] === "b"));
/**
 * tips: 数组中出现最多的数据
 */
const mostFrequent = (arr) =>
  Object.entries(
    arr.reduce((acc, cur, index) => {
      acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
      return acc;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

console.log(
  "数组出现最多的数据",
  mostFrequent(["a", "b", "a", "c", "a", "a", "b"])
);

/**
 * tips: 数组转对象
 */
const mapObject = (arr, fn) =>
  arr.reduce((acc, val, index) => {
    acc[val] = fn(val, index, arr);
    return acc;
  }, {});
console.log(
  "数组转对象",
  mapObject([1, 2, 3], (a) => a * a)
);

/**
 * tips: 对象的值
 */
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
const users = {
  fred: { user: "fred", age: 40 },
  pebbles: { user: "pebbles", age: 1 },
};
console.log(
  "对象的值",
  mapValues(users, (u) => u.age)
);

console.log(
  "对象的键",
  mapKeys({ a: 1, b: 2 }, (val, key) => key + val)
);

/**
 * tips: 数组对象排序
 */
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === "desc"
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
const orderWith = (arr, prop, order) => {
  const orderValues = order.reduce((acc, v, i) => {
    acc[v] = i;
    return acc;
  }, {});
  return [...arr].sort((a, b) => {
    if (orderValues[a[prop]] === undefined) return 1;
    if (orderValues[b[prop]] === undefined) return -1;
    return orderValues[a[prop]] - orderValues[b[prop]];
  });
};
const usersArray = [
  { name: "fred", language: "Javascript" },
  { name: "barney", language: "TypeScript" },
  { name: "frannie", language: "Javascript" },
  { name: "anna", language: "Java" },
  { name: "jimmy" },
  { name: "nicky", language: "Python" },
];
console.log(
  "数组对象排序",
  orderWith(usersArray, "language", ["Javascript", "TypeScript", "Java"])
);
const usersArrayAll = [
  { name: "fred", age: 48 },
  { name: "barney", age: 36 },
  { name: "fred", age: 40 },
];
console.log(
  "数组对象排序",
  orderBy(usersArrayAll, ["name", "age"], ["asc", "desc"])
);

/**
 * tips: 数组按照方法的结果拆分
 */
const partitionBy = (arr, fn) =>
  arr.reduce(
    ({ res, last }, v, i, a) => {
      const next = fn(v, i, a);
      if (next !== last) res.push([v]);
      else res[res.length - 1].push(v);
      return { res, last: next };
    },
    { res: [] }
  ).res;
const numbers = [1, 1, 3, 3, 4, 5, 5, 5];
// partitionBy(numbers, n => n); // [[1, 1], [3, 3], [4], [5, 5, 5]]
console.log(
  "数组拆分",
  partitionBy(numbers, (n) => n % 2 === 0)
); // [[1, 1, 3, 3], [4], [5, 5, 5]]

/**
 * tips: 一维才分为二维
 */
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
const users3 = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
];
// [
//   [{ user: 'fred', age: 40, active: true }],
//   [{ user: 'barney', age: 36, active: false }]
// ]
console.log(
  "一维才分为二维",
  partition(users3, (o) => o.active)
);

/**
 * tips: 前两项和
 */
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce(
    (res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res),
    [acc]
  );
console.log(
  "前两项和",
  reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0)
);
