/**
 * tips: 获取类型
 */
const getType = (v) =>
  v === undefined ? "undefined" : v === null ? "null" : v.constructor.name

console.log("获取类型", getType(new Set([1, 2, 3])))

/**
 * tips: 判断是什么类型
 */
const isType = (type, val) =>
  ![, null].includes(val) && val.constructor === type
console.log("判断是什么类型", isType(Array, [1]))

/**
 * tips: 是否是 boolean 类型
 */
const isBoolean = (val) => typeof val === "boolean"
console.log("boolean类型", isBoolean(false))

/**
 * tips: 是否是浏览器类型
 */
const isBrowser = () => ![typeof window, typeof document].includes("undefined")
const isNode = () =>
  typeof process !== "undefined" &&
  process.versions !== null &&
  process.versions.node !== null
console.log("浏览器", isBrowser())
console.log("Node", isNode())

/**
 * tips: 是否是日期类型
 */
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf())
console.log("是否是日期类型", isDateValid("1995-12-17T03:24:00"))

/**
 * tips: 是否是空
 */
const isEmpty = (val) => val == null || !(Object.keys(val) || val).length
console.log("是否是空", isEmpty([]))

/**
 * tips: 是否为 function
 */
const isFunction = (val) => typeof val === "function"
console.log(
  "是否是function",
  isFunction((x) => x)
)

/**
 * tips: 是否 valid json
 */
const isValidJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
console.log("是否是json", isValidJSON('{"name":"Adam","age":20}'))

/**
 * tips:是否是undefined
 */
const isUndefined = (val) => val === undefined
const isString = (val) => typeof val === "string"
console.log("是否是undefined", isUndefined(undefined))

/**
 * tips: 是否是Number 类型
 */
const isNumber = (val) => typeof val === "number" && val === val
console.log("是否是Number类型", isNumber(1))

/**
 * tips: 是否是对象类型
 */
const isObject = (obj) => obj === Object(obj)
const isObjectLike = (val) => val !== null && typeof val === "object"
console.log("是否是对象类型", isObject([1, 2, 3, 4]))

/**
 * tips: 是否是2的倍数
 */
const isPowerOfTwo = (n) => !!n && (n & (n - 1)) == 0
console.log("是否是2的倍数", isPowerOfTwo(8))
