/**
 * Creates a function that invokes `fn` with a given context, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to apply the given `context` to `fn`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

 * @param {*} fn 
 * @param {*} context 
 * @param  {...any} WrapArgs 
 * @returns
 */
const bind = (fn, context, ...WrapArgs) => (...args) =>
  fn.apply(context, [...WrapArgs, ...args]);

function greet(greeting, production) {
  return greeting + ' ' + this.user + production;
}
var person = {
  user: 'wxh'
};
const personGreet = bind(greet, person);
console.log(personGreet('hi', 'hello'));
