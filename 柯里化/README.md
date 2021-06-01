# 柯里化

## 是什么

柯里化是一种函数式编程的思想

函数式编程，强调的是如何通过函数的组合变换去解决问题，而不是通过写什么样的语句去解决问题。

函数实际上是一种映射，而这种映射关系是可以组合的。

## 为什么

1. 数据可以不断的从一个函数的输出可以流入另一个函数输入
2. 柯里化是一种函数式编程思想
3. 组合函数也是一种函数式编程思想

## 特点

1. 函数即是一种描述集合和集合之间的转换关系，输入通过函数都会返回有且只有一个输出值。
2. 函数也是一种数据类型。
3. 声明式编程:函数式编程大多时候都是在声明我需要做什么，而非怎么去做。
4. 惰性执行：函数只在需要的时候执行，即不产生无意义的中间变量。
5. 无状态和数据不可变。
6. 数据不可变：如果你想修改一个对象，那你应该创建一个新的对象用来修改，而不是修改已有的对象。
7. 无状态：给定相同的输入，给出相同的输出，完全不依赖外部状态的变化。

## 柯里化

柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

实现：通过创建一个保存着原始函数和要被套用的参数的闭包来实现柯里化。

1. 输入：一个函数里有多个参数 add(1,2,3,4)
2. 输出：一个参数的函数 add(1)(2)(3)(4)
3. 返回值也是一个函数
4. 把某个函数变得单值化，这样可以增加函数的多样性，使得其适用性更强

## 用途

1. 参数复用
2. ajax(type="post",data="wxh",url="http://xxxx")
3. 可以转换成 let curryType = curryAjax('post')
4. 可以转换成 let data= curryType('data')
5. 一级一级的复用

```js
function add(a, b) {
  return a + b;
}
// 执行 add 函数，一次传入两个参数即可
add(1, 2); // 3
// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2); // 3
```

## 实现

```js
function curry(fn, args) {
  length = fn.length; // 回调参数列表

  args = args || []; // 参数

  return function () {
    var _args = args.slice(0),
      arg,
      i;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];

      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c"); // ["a", "b", "c"]
fn("a", "b")("c"); // ["a", "b", "c"]
fn("a")("b")("c"); // ["a", "b", "c"]
fn("a")("b", "c"); // ["a", "b", "c"]
```

## 组合函数

利用 compose 将两个函数组合成一个函数，让代码从右向左运行，而不是由内而外运行，可读性大大提升。这便是函数组合。

### 实现

```js
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}
```
