/**
 * 自定义 call
 * @param {*} fn
 * @param {*} context
 * @param  {...any} WrapArgs
 * @returns
 */
const call = (key, ...args) => (context) => context[key](...args)
Promise.resolve([1, 2, 3])
  .then(call("map", (x) => 2 * x))
  .then(console.log) // [ 2, 4, 6 ]

const map = call.bind(null, "map")
Promise.resolve([1, 2, 3])
  .then(map((x) => 2 * x))
  .then(console.log) // [ 2, 4, 6 ]

/**
 * 复制一个对象
 * @param {*} fn
 * @param {*} context
 * @param  {...any} WrapArgs
 * @returns
 */
const bind = (fn, context, ...WrapArgs) => (...args) =>
  fn.apply(context, [...WrapArgs, ...args])

function greet(greeting, production) {
  return greeting + " " + this.user + production
}
var person = {
  user: "wxh"
}
const personGreet = bind(greet, person)
console.log(personGreet("hi", "hello"))

/**
 * 复制一个对象的属性
 */
const bindKey = (context, fn, ...argsWrap) => (...args) =>
  context[fn].apply(context, [...argsWrap, ...args])

const freddy = {
  name: "wxh",
  greet: function (greeting, production) {
    return greeting + " " + this.name + " " + production
  }
}

const demo = bindKey(freddy, "greet")
console.log(demo("hi", "!"))
