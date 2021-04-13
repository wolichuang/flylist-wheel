/**
 * tips: Creates a frozen `Set` object.
 */
const frozenSet = (iterable) => {
  const s = new Set(iterable)
  s.add = undefined
  s.delete = undefined
  s.clear = undefined
  return s
}
console.log("set对象", frozenSet([1, 2, 3, 1, 2]))
