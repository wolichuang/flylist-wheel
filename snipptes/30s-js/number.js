/**
 * title: validateNumber
tags: math,intermediate
 */
const validateNumber = (n) => {
  const num = parseFloat(n);
  return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
};
console.log(validateNumber("10"));
console.log("===================");

/**
 * tips: 数字转数组
 */
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
  }).map((_, i) => start * step ** i);
console.log("数字转数组", geometricProgression(256));
console.log("===================");

/**
 * tips: 数组求乘机
 */
const prod = (...arr) => [...arr].reduce((acc, val) => acc * val, 1);
console.log("数组求乘机", prod(...[1, 2, 3, 4]));
console.log("===================");

/**
 * tips: 生成指定值内的素数
 */
const primes = (num) => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(
    (x) => (arr = arr.filter((y) => y % x !== 0 || y === x))
  );
  return arr;
};
console.log("10以内的素数", primes(10));
console.log("===================");

/**
 * tips: Kb 转换
 */
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (Math.abs(num) < 1) return num + (addSpace ? " " : "") + UNITS[0];
  const exponent = Math.min(
    Math.floor(Math.log10(num < 0 ? -num : num) / 3),
    UNITS.length - 1
  );
  const n = Number(
    ((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision)
  );
  return (num < 0 ? "-" : "") + n + (addSpace ? " " : "") + UNITS[exponent];
};
console.log("KB转换", prettyBytes(1000));

/**
 * 随机数Generator
 */
const rangeGenerator = function* (start, end, step = 1) {
  let i = start;
  while (i < end) {
    yield i;
    i += step;
  }
};
for (let i of rangeGenerator(6, 10)) console.log(i);

/**
 * 数字反转
 * @param {*} n
 * @returns
 */
const reverseNumber = (n) =>
  parseFloat(`${n}`.split("").reverse().join("")) * Math.sign(n);
// reverseNumber(981); // 189
