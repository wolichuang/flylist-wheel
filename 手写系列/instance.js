// 实现：instance
/**
 * 
 * @param {*} left 
 * @param {*} right 
 * @returns
 */
function InstanceOf(left, right) {
  let leftVal = Object.getPrototypeOf(left);
  let rightVal = right.prototype;

  while (leftVal !== null) {
    if (leftVal === rightVal) {
      return true;
    }
    leftVal = Object.getPrototypeOf(leftVal); //递归
  }
  return false;
}
