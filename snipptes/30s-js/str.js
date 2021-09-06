/**
 *title: yesNo
tags: string,regexp,intermediate
 */
const yesNo = (val, def = false) =>
  /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;

console.log(yesNo("Y")); // true
console.log(yesNo("yes")); // true
console.log(yesNo("No")); // false
console.log(yesNo("Foo", true)); // true);

/**
 * tips: 字节数
 */
// const byteSize = (str) => new Blob([str]).size
// console.log(byteSize("Hello World"))

/**
 * tips: 首字母大写
 */
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
console.log(capitalizeEveryWord("hello world!"));

/**
 * tips: 查找数组中 false
 */
const coalesce = (...args) =>
  args.find((item) => ![undefined, null].includes(item));
console.log("查找数组中 false", coalesce(null, undefined, "", NaN, "Waldo"));

/**
 * tips: 查找数组中 true
 */
const coalesceFactory = (valid) => (...args) => args.find(valid);
const customCoalesce = coalesceFactory(
  (v) => ![null, undefined, "", NaN].includes(v)
);
console.log(
  "查找数组中 true",
  customCoalesce(undefined, null, NaN, "", "Waldo")
);

/**
 * tips: 去掉空格 compactWhitespace
 */
const compactWhitespace = (str) => str.replace(/\s{2,}/g, " ");

console.log("去掉空格", compactWhitespace("Lorem \n Ipsum"));

/**
 * tips: 判断是否有空格
 */
const containsWhitespace = (str) => /\s/.test(str);
console.log("判断是否有空格", containsWhitespace("lorem ipsum"));

/**
 * tips: 全部转换为大写
 */
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() +
  (upperRest ? rest.join("").toUpperCase() : rest.join(""));

console.log("转换为大写", decapitalize("FooBar", true));

/**
 * tips: 颜色转换
 */
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
console.log(HSLToRGB(13, 100, 11)); // [56.1, 12.155, 0]
const toRGBArray = (rgbStr) => rgbStr.match(/\d+/g).map(Number);
toRGBArray("rgb(255, 12, 0)"); // [255, 12, 0]
const toRGBObject = (rgbStr) => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};
toRGBObject("rgb(255, 12, 0)"); // {red: 255, green: 12, blue: 0}
/*
 * tips: 颜色转换
 */
const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
console.log(HSBToRGB(18, 81, 99));

const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
RGBToHex(255, 165, 1); // 'ffa501'

const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
RGBToHSB(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (h >>> (alpha ? 24 : 16)) +
    ", " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ", " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "") +
    ")"
  );
};
console.log(hexToRGB("#27ae60ff"));
const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
/**
 * tips: 字符串处理
 */
const mapString = (str, fn) =>
  str
    .split("")
    .map((c, i) => fn(c, i, str))
    .join("");
console.log(
  "字符串处理",
  mapString("lorem ipsum", (c) => c.toUpperCase())
);

/**
 * tips: pass 字符串
 */
const passMask = (cc, num = 4, mask = "*") =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
console.log("pass 字符串", passMask(1234567890, -4, "$"));

/**
 * tips: 判断是否为回文
 */
const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, "");
  return s === [...s].reverse().join("");
};

console.log("判断是否为回文", palindrome("taco cat"));

/**
 * tips: 补0
 */
const padNumber = (n, s) => `${n}`.padStart(s, "0");
const pad = (str, length, char = " ") =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);
console.log("字符串补0", padNumber(123, 6), pad(String(42), 6, "0"));

/**
 * tips：双数
 */
const pluralize = (val, word, plural = word + "s") => {
  const _pluralize = (num, word, plural = word + "s") =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === "object")
    return (num, word) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};
console.log("转双数", pluralize(2, "apple"));

/**
 * 删除 ASCII
 * @param {*} str
 * @returns
 */
const removeNonASCII = (str) => str.replace(/[^\x20-\x7E]/g, "");
removeNonASCII("äÄçÇéÉêlorem-ipsumöÖÐþúÚ"); // 'lorem-ipsum'

/**
 * 删除空格
 * @param {*} str
 * @returns
 */
const removeWhitespace = (str) => str.replace(/\s+/g, "");
/**
 * 随机字符串
 * @param {*} length
 * @returns
 */
const randomAlphaNumeric = (length) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};
randomAlphaNumeric(5); // '0afad'

/**
 * 反转字符串
 * @param {*} str
 * @returns
 */
const reverseString = (str) => [...str].reverse().join("");
reverseString("foobar"); // 'raboof'

// 字符串转 -
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

slugify("Hello World!"); // 'hello-world'

// 拆分
const splitLines = (str) => str.split(/\r?\n/);
splitLines("This\nis a\nmultiline\nstring.\n");
// ['This', 'is a', 'multiline', 'string.' , '']

// json 格式化
const stringifyCircularJSON = (obj) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (v !== null && typeof v === "object") {
      if (seen.has(v)) return;
      seen.add(v);
    }
    return v;
  });
};
const obj = { n: 42 };
obj.obj = obj;
stringifyCircularJSON(obj); // '{"n": 42}'

// 字符串-大写字母
const swapCase = (str) =>
  [...str]
    .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join("");
swapCase("Hello world!"); // 'hELLO WORLD!'
// 字符串-横岗
const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");
toSnakeCase("camelCase"); // 'camel_case'

// 字符串-大写字母
const toTitleCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");

const toCamelCase = (str) => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
toCamelCase("some_database_field_name"); // 'someDatabaseFieldName'

// 字符串-超出省略号
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;
truncateString("boomerang", 7); // 'boom...'
const truncateStringAtWhitespace = (str, lim, ending = "...") => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(" ");
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};
truncateStringAtWhitespace("short", 10); // 'short'
truncateStringAtWhitespace("not so short", 10); // 'not so...'
truncateStringAtWhitespace("trying a thing", 10); // 'trying...'
truncateStringAtWhitespace("javascripting", 10); // 'javascr...'
