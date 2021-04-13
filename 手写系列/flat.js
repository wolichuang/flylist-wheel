// 数组扁平化
function flatten(array) {
  var res = [];
  for (let index = 0; index < array.length; index++) {
    if (Array.isArray(array[index])) {
      res = res.concat(flatten(array[index]));
    } else {
      res.push(array[index]);
    }
  }
  return res;
}
console.log(flatten([1, [2, [3]]]));
// [1, [2, [3]]].flat(2)  // [1, 2, 3]

function flattenEs6(array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}
console.log(flattenEs6([1, [2, [3]]]));
