// 实现 map
Array.prototype._map = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + "is not a function");
  }

  const arr = this;
  const length = this.length;
  const temp = new Array(length);
  // 对数组中每个值进行处理
  for (let index = 0; index < length; index++) {
    // 获取第二个参数，改变this指向
    let res = fn.call(arguments[1], arr[index], index, arr);
    temp[i] = res;
  }
  // 返回新的结果
  return temp;
};
