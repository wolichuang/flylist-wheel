// 手写-数据类型判断
function typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(" ")[1]; // 利用 Object.prototype.toString 获取到原型名
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}

function typeOf1(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
console.log(typeOf1([]));
console.log(typeOf1({}));
console.log(typeOf1(new Date()));
