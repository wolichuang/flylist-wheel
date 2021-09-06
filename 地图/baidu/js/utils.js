/*
 * @func 获取查询字符串对象
 * @params url:string
 * @return obj
 * @author xguo
 * @date 7/9
 */

function getQueryStringObj(url) {
  let qsObj = {};
//   if (isValidUrl(url)) {
//       return qsObj;
//   }
  let qs = url.substring(url.indexOf("?") + 1);
  let arrKey = qs.split("&");
  arrKey.forEach(function (entry) {
    // console.log(entry);
    let arrVal = entry.split("=");
    console.log(arrVal);
    qsObj[arrVal[0]] = arrVal[1];
  });
console.log(qsObj, qsObj.ak);
// 百度 正则 查询匹配
  return qsObj;
}

/*
 * @func 
 * @params {*} url:string
 * @return boolean
 * 
 * @date 7/9
 */
// function isValidUrl(url) {
//     if (!url || url.indexOf('?') == -1) {
//         return false;
//     }
//     return true;
// }
