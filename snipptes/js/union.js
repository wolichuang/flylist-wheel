/*
Finds all unique values in an array.

- Create a `new Set()` from the given array to discard duplicated values.
- Use the spread operator (`...`) to convert it back to an array.

*/
const uniqueElements = (arr) => [...new Set(arr)]

console.log(uniqueElements([1, 2, 2, 3, 4, 4, 5]))
console.log("结果=", [1, 2, 3, 4, 5])

/**
 * title: union
tags: array,beginner
 */

const union = (a, b) => Array.from(new Set(a, b))

console.log(union([1, 2, 3], [4, 3, 2]))
console.log("结果=", [1, 2, 3])

/**
 * title: unionBy
tags: array,intermediate
 */
const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn))
  return Array.from(new Set([...a, ...b.filter((x) => !s.has(fn(x)))]))
}

console.log([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }])
console.log(
  "结果=",
  unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x) => x.id)
)
console.log("=================")
/**
 * Returns every element that exists in any of the two arrays at least once, using a provided comparator function.
 * Create a `new Set()` with all values of `a` and values in `b` for which the comparator finds no matches in `a`, using `Array.prototype.findIndex()`
 */

const unionWith = (a, b, comp) =>
  Array.from(
    new Set([...a, ...b.filter((x) => a.findIndex((y) => comp(x, y)) === -1)])
  )

console.log([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9])
console.log(
  "结果=",
  unionWith(
    [1, 1.2, 1.5, 3, 0],
    [1.9, 3, 0, 3.9],
    (a, b) => Math.round(a) === Math.round(b)
  )
)
console.log("=================")
/**
 * Finds all unique values of an array, based on a provided comparator function, starting from the right.

- Use `Array.prototype.reduceRight()` and `Array.prototype.some()` for an array containing only the last unique occurrence of each value, based on the comparator function, `fn`.
- The comparator function takes two arguments: the values of the two elements being compared.

 */
const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, val) => {
    if (!acc.some((x) => fn(val, x))) acc.push(val)
    return acc
  }, [])
console.log([
  { id: 0, value: "a" },
  { id: 1, value: "b" },
  { id: 2, value: "c" },
  { id: 1, value: "d" },
  { id: 0, value: "e" }
])
console.log(
  "结果=",
  uniqueElementsByRight(
    [
      { id: 0, value: "a" },
      { id: 1, value: "b" },
      { id: 2, value: "c" },
      { id: 1, value: "d" },
      { id: 0, value: "e" }
    ],
    (a, b) => a.id == b.id
  )
)
console.log("=================")
/**
 * Returns the unique symmetric difference between two arrays, not containing duplicate values from either array.

- Use `Array.prototype.filter()` and `Array.prototype.includes()` on each array to remove values contained in the other.
- Create a `new Set()` from the results, removing duplicate values.
 */
const uniqueSymmetricDifference = (a, b) => [
  ...new Set([
    ...a.filter((v) => !b.includes(v)),
    ...b.filter((v) => !a.includes(v))
  ])
]

console.log([1, 2, 3], [1, 2, 4])
console.log("结果=", uniqueSymmetricDifference([1, 2, 3], [1, 2, 4]))
console.log("=================")

/**
 * tips: chunk 数组分隔
 */
const chunk = (arr, size) =>
  Array.from(
    {
      length: Math.ceil(arr.length / size)
    },
    (v, i) => arr.slice(i * size, i * size + size)
  )
console.log([1, 2, 3, 4, 5])
console.log("结果=", chunk([1, 2, 3, 4, 5], 2))
console.log("=================")
