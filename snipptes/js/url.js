/*
title: URLJoin
tags: string,regexp,advanced
*/
const URLJoin = (...args) =>
  args
    .join("/")
    .replace(/[\/]+/g, "/")
    .replace(/^(.+):\//, "$1://")
    .replace(/^file:/, "file:/")
    .replace(/\/(\?|&|#[^!])/g, "$1")
    .replace(/\?/g, "&")
    .replace("&", "?")
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'
console.log(
  URLJoin("http://www.google.com", "a", "/b/cd", "?foo=123", "?bar=foo")
)

/**
 * tips: 获取 url base
 */
const getBaseURL = (url) =>
  url.indexOf("?") > 0 ? url.slice(0, url.indexOf("?")) : url
console.log(getBaseURL("http://url.com/page?name=Adam&surname=Smith"))

/**
 * tips: 获取 url 链接参数
 */
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  )
console.log(
  "获取 url 链接参数",
  getURLParameters("http://url.com/page?name=Adam&surname=Smith")
)

/**
 * tips: http 转换成 https
 */
const httpsRedirect = () => {
  if (location.protocol !== "https:")
    location.replace("https://" + location.href.split("//")[1])
}

/**
 * tips: 判断绝对路径
 */
const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str)
console.log("判断绝对路径", isAbsoluteURL("https://google.com"))
