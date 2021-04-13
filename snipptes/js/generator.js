/**
 * tips:generator
 */
const cycleGenerator = function* (arr) {
  let i = 0
  while (true) {
    yield arr[i % arr.length]
    i++
  }
}
const binaryCycle = cycleGenerator([0, 1])
console.log(binaryCycle.next()) // { value: 0, done: false }
console.log(binaryCycle.next()) // { value: 1, done: false }
console.log(binaryCycle.next()) // { value: 0, done: false }
console.log(binaryCycle.next()) // { value: 1, done: false }
