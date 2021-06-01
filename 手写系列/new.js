// 实现：new
/**
 * 1. 创建一个新对象
 * 2. 该对象的 __proto__属性指向该构造函数的原型，即 Fn.prototype
 * 3. 将执行上下文 this 绑定到新创建的对象中。
 * 4. 如果构造函数有返回值，那么这个返回值将取代第一个步中新创建的对象
 */
function New(Fn, ...args) {
  // 一个新的对象被创建
  const res = {};
  // 该对象的__proto__属性指向该构造函数的原型
  if (Fn.prototype !== null) {
    Object.setPrototypeOf(res, Fn.prototype);
  }
  // 将执行上下文（this）绑定到新创建的对象中
  const returnResult = Fn.apply(result, arg);
  // 如果构造函数有返回值，那么这个返回值将取代第一步中新创建的对象。否则返回该对象
  if (
    (typeof returnResult === "object" || typeof returnResult === "function") &&
    returnResult !== null
  ) {
    return returnResult;
  }
  return result;
}
