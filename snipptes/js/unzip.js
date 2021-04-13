/**
 * ---
title: unzip
tags: array,intermediate
---
 */
const unzip = (arr) =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map((x) => x.length))
    }).map((x) => [])
  );
console.log(
  unzip([
    ['a', 1, true],
    ['b', 2, false]
  ])
);
console.log('============');

/**
 * ---
title: unzipWith
tags: array,advanced
---
 */
const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map((x) => x.length))
      }).map((x) => [])
    )
    .map((val) => fn(...val));
console.log(
  unzipWith(
    [
      [1, 10, 100],
      [2, 20, 200]
    ],
    (...args) => args.reduce((acc, v) => acc + v, 0)
  )
);
console.log('===================');
