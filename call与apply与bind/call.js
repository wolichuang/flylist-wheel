function fn(a, b) {
  console.log(this, a, b);
}
var obj = {
  name: "wxh",
};

// fn.call(obj, 20, 30);

// fn.call(20, 30);

// fn.call(undefined);

var obj1 = {
  a: 10,
  fn: function (x) {
    console.log(this.a + x); // 20 + 20
  },
};

var obj2 = {
  a: 20,
  fn: function (x) {
    console.log(this.a - x);
  },
};

obj1.fn.call(obj2, 20); // 40

var name = "wxh2";
var obj3 = {
  name: "wxh",
  fn: function () {
    console.log(`${this.name + [...arguments]}`);
    return `${this.name + [...arguments]}`;
  },
};

obj3.fn.apply(global, [12, 22, 32, 42]); // wxh2  12, 22, 32, 42

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  // 这里的 this 是指向 fn 的，通过 this 就可以获取 fn，context 是我们的 obj，可以直接给 obj 添加一个函数属性
  context.fn = this;
  delete context.fn(...args);
  return;
};

Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  delete context.fn(args);
  return;
};
