const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

console.log("1024", curry(Math.pow)(2)(10)) // 1024
console.log(curry(Math.min, 3)(10)(50)(2)) // 2
