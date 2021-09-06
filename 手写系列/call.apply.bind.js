/*
 * @Description: 
 * @Author: Chuang Li
 * @Date: 2021-04-25 13:57:38
 * @LastEditTime: 2021-09-06 15:23:38
 * @LastEditors: Chuang Li
 */
// 实现 call
Function.prototype.myCall = function (context, ...args) {
  // 获取第一个参数（注意第一个参数为null或undefined，this指向window），构建对象
  context = context ? Object(context) : window;
  // 将对应函数传入该对象中
  context.fn = this;
  // 获取参数并执行相应函数
  let result = context.fn(...args);
  delete context.fn;
};

// 实现 apply
Function.prototype.myApply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;

  let result = arr ? context.fn(...arr) : context.fn();

  delete context.fn;

  return result;
};

// 实现bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("The bound object needs to be a function");
  }

  const self = this;
  const fNOP = function () {};
  const fBound = function (...fBoundArgs) {
    // 指定this
    // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true
    return self.apply(this instanceof fNOP ? this : context, [
      ...args,
      ...fBoundArgs,
    ]);
  };

  //  修改返回函数的 prototype 为绑定函数的 prototype,为了避免直接修改this的原型，所以新建了一个fNOP函数作为中介
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();

  return fBound;
};


// test - call
let foo = {
  value: 1
}
function bar(name, age) {
  console.log(name);
  console.log(age);
  // this 指向全局 对象的方法被调用
  // bar 作为 foo 的方法调用
  console.log(this.value); //由函数的调用方式决定
}
bar.myCall(foo, 'wxh', 35)
// test - apply
bar.myApply(foo,['wxh',35])