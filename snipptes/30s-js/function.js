/**
 * tips: 获取函数名
 */
const functionName = (fn) => (console.debug(fn.name), fn);

console.log("获取函数名", functionName(Math.max)(5, 6));

/**
 * tips: 是否是 async 函数
 */
const isAsyncFunction = (val) =>
  Object.prototype.toString.call(val) === "[object AsyncFunction]";
console.log(
  "是否是 async 函数",
  isAsyncFunction(async function () {})
);

/**
 * tips: 记忆函数
 */
// const memoize = (fn) => {
//   const cache = new Map();
//   const cached = function (val) {
//     return cache.has(val)
//       ? cache.get(val)
//       : cache.set(val, fn.call(this, val)) && cache.get(val);
//   };
//   cached.cache = cache;
//   return cached;
// };
// const anagramsCached = memoize(anagrams);
// anagramsCached("javascript"); // takes a long time
// anagramsCached("javascript"); // returns virtually instantly since it's cached
// console.log(anagramsCached.cache); // The cached anagrams map

/**
 * tips: 参数执行多个方法
 */
const overArgs = (fn, transforms) => (...args) =>
  fn(...args.map((val, i) => transforms[i](val)));
const square = (n) => n * n;
const double = (n) => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
console.log("参数执行多个方法", fn(9, 3)); // [81, 6]

const pipeFunctions = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = pipeFunctions(multiply, add5);
  console.log("参数执行多个方法",  multiplyAndAdd5(5, 2)); // 15