/**
 * tips: 计算平均值
 */
const average = (...num) => num.reduce((acc, val) => acc + val, 0);

console.log("平均值", average(...[1, 2, 3]));

/**
 * tips: 计算对象的平均值
 */
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0);

console.log(
  "计算对象的平均值",
  averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n)
);

/**
 * tips: 精度判断两个数是否相等
 */
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;
console.log(
  "精度判断两个数是否相等",
  approximatelyEqual(Math.PI / 2.0, 1.5708)
);

/**
 * tips: 数字拆分成数组
 */

const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n);
console.log("数字拆分成数组", arithmeticProgression(5, 25));

/**
 * tips: 求平均值
 */
const converge = (converger, fns) => (...args) =>
  converger(...fns.map((fn) => fn.apply(null, args)));

const averageTips = converge((a, b) => a / b, [
  (arr) => arr.reduce((a, v) => a + v, 0),
  (arr) => arr.length,
]);
console.log("求平均值", averageTips([1, 2, 3, 4, 5, 6, 7])); // 4

/**
 * tips: 小数点
 */
const degreesToRads = (deg) => (deg * Math.PI) / 180.0;
console.log("小数点", degreesToRads(90.0));

/**
 * tips: 计算间距
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
console.log("计算间距", distance(1, 1, 2, 3));

/**
 * tips: 取模取余
 */
const divmod = (x, y) => [Math.floor(x / y), x % y];
console.log("取模取余", divmod(8, 3));

/**
 * tips:间隔取数
 */
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

console.log("间隔取数", everyNth([1, 2, 3, 4, 5, 6], 2));

/**
 * tips: 斐波那契序列
 */
const fibonacci = (n) =>
  Array.from({ length: n }).reduce(
    (acc, cur, index) =>
      acc.concat(index > 1 ? acc[index - 1] + acc[index - 2] : index),
    []
  );

console.log("斐波那契", fibonacci(6)); // [ 0, 1, 1, 2, 3, 5 ]

/**
 * tips: 斐波那契求和
 */
const fibonacciTotal = (n) => (n <= 1 ? 1 : n * fibonacciTotal(n - 1));

console.log("斐波那契求和", fibonacciTotal(6)); // 720

/**
 * tips: 判断一个数是否在 m - n 之间
 */
const inRange = (n, start, end = null) => {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

console.log("判断一个数是否在 m - n 之间", inRange(3, 2, 5));

/**
 * tips: km to miles
 */
const kmToMiles = (km) => km * 0.621371;
console.log("千米to米", kmToMiles(8.1));

/**
 * tips: 补 0
 */
const padNumber = (n, l) => `${n}`.padStart(l, "0");
const pad = (str, length, char = " ") =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);
console.log("补0", padNumber(1234, 6));
console.log("补0", pad(String(42), 6, "0"));

/**
 * tips: 转角度
 * @param {*} rad
 * @returns
 */
const radsToDegrees = (rad) => (rad * 180.0) / Math.PI;
radsToDegrees(Math.PI / 2); // 90

// 等差数列 1 + 2 + 3 + 4 的平方
const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);
sumPower(10); // 385
sumPower(10, 3); // 3025
sumPower(10, 3, 5); // 2925

const sumN = (n) => (n * (n + 1)) / 2;
sumN(100); // 5050

// 数字-罗马数字
const toRomanNumeral = (num) => {
  const lookup = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  return lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v));
    num = num % v;
    return acc;
  }, "");
};
toRomanNumeral(3); // 'III'

// 取整
const toSafeInteger = (num) =>
  Math.round(
    Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
  );
toSafeInteger("3.2"); // 3
