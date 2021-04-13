/**
 * tips: 判断是否是数字 和 字符串
 */
const isAlphaNumeric = (str) => /^[a-z0-9]+$/gi.test(str);
console.log("是否数字和字符串", isAlphaNumeric("hello123"));

/**
 * tips: 转换 cookies
 */
const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
console.log("转换 cookies", parseCookie("foo=bar; equation=E%3Dmc%5E2"));
