/**
 * title: zip
tags: array,intermediate
 */

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map((x) => x.length));
  return Array.from({
    length: maxLength
  }).map((_, i) => {
    return Array.from(
      {
        length: arrays.length
      },
      (_, k) => arrays[k][i]
    );
  });
};
console.log(zip(['a', 'b'], [1, 2], [true, false])); // [['a', 1, true], ['b', 2, false]]
console.log(zip(['a'], [1, 2], [true, false])); // [['a', 1, true], [undefined, 2, false]]);
console.log('======================');
/**
title: zipWith
tags: array,advanced
 */
const zipWith = (...array) => {
  const fn =
    typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
  return Array.from(
    { length: Math.max(...array.map((a) => a.length)) },
    (_, i) => (fn ? fn(...array.map((a) => a[i])) : array.map((a) => a[i]))
  );
};

console.log(zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c)); // [111, 222]
console.log(
  zipWith(
    [1, 2, 3],
    [10, 20],
    [100, 200],
    (a, b, c) =>
      (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
  )
); // [111, 222, '3bc']);
console.log('======================');

/**
 * title: zipObject
tags: array,object,intermediate
 */
const zipObject = (props, value) =>
  props.reduce((prev, all, index) => ((prev[all] = value[index]), prev), {});
console.log(zipObject(['a', 'b', 'c'], [1, 2])); // {a: 1, b: 2, c: undefined}
console.log(zipObject(['a', 'b'], [1, 2, 3])); // {a: 1, b: 2});
console.log('======================');
