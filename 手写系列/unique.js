// 数组去重
function unique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

var unique = (arr) => [...new Set(arr)];
