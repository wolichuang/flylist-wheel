/**
Unescapes escaped HTML characters.

- Use `String.prototype.replace()` with a regexp that matches the characters that need to be unescaped.
- Use the function's callback to replace each escaped character instance with its associated unescaped character using a dictionary (object).

 */
const unescapeHTML = (str) =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&quot;": '"',
      }[tag] || tag)
  );

console.log("&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;");
console.log(
  "结果=",
  unescapeHTML("&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;")
);
console.log("=================");

/**
 * tips: 字符串转 html
 * @param {*} arr
 * @param {*} listID
 * @returns
 */
const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag)
  );
console.log(escapeHTML('<a href="#">Me & you</a>'));
console.log("=================");
/**
 * tips: array to htmls
 * @param {*} arr
 * @param {*} listID
 * @returns
 */
const arrayToHTMLList = (arr, listID) =>
  (document.querySelector(`#${listID}`).innerHTML += arr
    .map((item) => `<li>${item}</li>`)
    .join(""));

console.log(arrayToHTMLList(["item 1", "item 2"], "myListID"));

/**
 * tips:判断是否到底
 */

const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

/**
 * tips: 创建元素
 */
const createElement = (str) => {
  const el = document.createElement("div");
  el.innerHTML = str;
  return el.firstElementChild;
};
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className);

/**
 * tips: 复制文本
 */
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
console.log(copyToClipboard("Lorem ipsum"));

/**
 * tips: delay 延迟
 */
const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);
delay(
  function (text) {
    console.log(text);
  },
  1000,
  "later"
);

/**
 * tips: elements is Focus
 */
const elementIsFocused = (el) => el === document.activeElement;
elementIsFocused(el);

/**
 * tips: 获取元素的可视区域
 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect(); // 获取矩形区域的位置
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// el: position: absolute; left:0; right:0;
elementIsVisibleInViewport(el);

/**
 * tips: 色彩转换
 */
const extendHex = (shortHex) =>
  "#" +
  shortHex
    .slice(shortHex.startsWith("#") ? 1 : 0)
    .split("")
    .map((x) => x + x)
    .join("");
console.log("色彩转换：" + extendHex("#03f"));

/**
 * tips: 随机颜色
 */
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};
console.log("随机颜色" + randomHexColorCode());
/**
 * tips:  tabs 替换成空格
 */
const expandTabs = (str, count) => str.replace(/\t/g, " ".repeat(count));
console.log("tabs 替换成空格", expandTabs("\t\tlorem", 3));

/*
tips: 表单转对象
 */
const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  );
// console.log(formToObject(document.querySelector("#form")))
// { email: 'test@email.com', name: 'Test Name' });

/**
 * tips: 获取样式
 */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
console.log("获取样式", getStyle(document.querySelector("p"), "font-size"));

/**
 * tips: 获取兄弟节点
 */
const getSiblings = (el) =>
  [...el.parentNode.childNodes].filter((node) => node !== el);
console.log("获取兄弟节点", getSiblings(document.querySelector("head")));

/**
 * tips: 选择文本
 */
const getSelectedText = () => window.getSelection().toString();
console.log("获取选择文本", getSelectedText());

/**
 * tips: 获取滚动条位置
 */
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
console.log("获取滚动条位置", getScrollPosition());

/**
 * tips: 获取图片标签
 */
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName("img")].map((img) =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};
console.log("获取图片标签", getImages(document, true));

/**
 * tips: 计算函数运行时间 performance
 */
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
};
const numbers = Array(10000)
  .fill()
  .map((_, i) => i);

const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
console.log("计算函数运行时间", Math.round(hz(sumReduce)));

/**
 * tips: 隐藏标签
 */
const hideElement = (...el) =>
  [...el].forEach((e) => (e.style.display = "none"));
console.log("隐藏标签", hideElement(document.querySelectorAll("img")));

/**
 * tips: 是否有 class
 */
const hasClass = (el, className) => el.classList.contains(className);
console.log(
  "是否有class",
  hasClass(document.querySelector("p.special"), "special")
);
const toggleClass = (el, className) => el.classList.toggle(className);
/**
 * tips: hash
 */
const hashBrowser = (val) =>
  crypto.subtle
    .digest("SHA-256", new TextEncoder("utf-8").encode(val))
    .then((h) => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join("");
    });
console.log(
  hashBrowser(
    JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } })
  ).then(console.log)
);

/**
 * tips: 插入 css
 */
const injectCSS = (css) => {
  let el = document.createElement("style");
  el.type = "text/css";
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};
injectCSS("body { background-color: #000 }");

/**
 * tips: 插入元素之后
 */
const insertAfter = (el, htmlString) =>
  el.insertAdjacentHTML("afterend", htmlString);

// insertAfter(document.getElementById("myId"), "<p>after</p>");

const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML("beforebegin", htmlString);

// insertBefore(document.getElementById("myId"), "<p>before</p>");

/**
 * tips: 监听一次
 */
const listenOnce = (el, evt, fn) =>
  el.addEventListener(evt, fn, { once: true });
// listenOnce(document.getElementById("my-id"), "click", () =>
//   console.log("Hello world")
// );

/**
 * tips: 获取浏览器默认语言
 */
const detectLanguage = (defaultLang = "en-US") =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

console.log("获取浏览器默认语言", detectLanguage());

/**
 * tips: 获取设备类型
 */
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
console.log("获取设备类型", detectDeviceType());

/**
 * tips: 事件卸载
 */
// const off = (el, evt, fn, opts = false) =>
//   el.removeEventListener(evt, fn, opts);
// const fnOne = () => console.log("!");
// document.body.addEventListener("click", fnOne);
// off(document.body, "click", fnOne); // no longer logs '!' upon clicking on the page

/**
 * tips: 事件绑定
 */
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = (e) =>
    e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(
    evt,
    opts.target ? delegatorFn : fn,
    opts.options || false
  );
  if (opts.target) return delegatorFn;
};
// const fn = () => console.log("!");
// on(document.body, "click", fn); // logs '!' upon clicking the body
// on(document.body, "click", fn, { target: "p" });
// // logs '!' upon clicking a `p` element child of the body
// on(document.body, "click", fn, { options: true });
// use capturing instead of bubbling

/**
 * tips: 事件绑定一次
 */
const once = (fn) => {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};
const startApp = function (event) {
  console.log(this, event); // document.body, MouseEvent
};
// document.body.addEventListener("click", once(startApp));
// only runs `startApp` once upon click

/**
 * tips: cookie 转换
 */
const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
parseCookie("foo=bar; equation=E%3Dmc%5E2"); // { foo: 'bar', equation: 'E=mc^2' }

/**tips: url 参数字符串转对象 */
const queryStringToObject = (url) =>
  [...new URLSearchParams(url.split("?")[1])].reduce(
    (a, [k, v]) => ((a[k] = v), a),
    {}
  );
queryStringToObject("https://google.com?page=1&count=10"); // {page: '1', count: '10'}

/** tips: 替换链接 */
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);
redirect("https://google.com");

/**
 * tips: 创建 element 元素
 */
const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  const isListener = (p) => p.startsWith("on");
  const isAttribute = (p) => !isListener(p) && p !== "children";

  Object.keys(props).forEach((p) => {
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if (!isTextElement && props.children && props.children.length)
    props.children.forEach((childElement) =>
      renderElement(childElement, element)
    );

  container.appendChild(element);
};

const myElement = {
  type: "button",
  props: {
    type: "button",
    className: "btn",
    onClick: () => alert("Clicked"),
    children: [{ props: { nodeValue: "Click me" } }],
  },
};

renderElement(myElement, document.body);

/**
 * 返回顶部
 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
scrollToTop(); // Smooth-scrolls to the top of the page

/**
 * 序列化cookiee
 */
const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
serializeCookie("foo", "bar"); // 'foo=bar'

/**
 * 序列化 form
 */
const serializeForm = (form) =>
  Array.from(new FormData(form), (field) =>
    field.map(encodeURIComponent).join("=")
  ).join("&");
serializeForm(document.querySelector("#form"));

/**
 * 设置样式
 */
const setStyle = (el, rule, val) => (el.style[rule] = val);
setStyle(document.querySelector("p"), "font-size", "20px");

// 滚动到指定位置
const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
smoothScroll("#fooBar"); // scrolls smoothly to the element with the id fooBar
smoothScroll(".fooBar"); // scrolls smoothly to the first element with a class of fooBar

// 剔除 html 标签
const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, "");
stripHTMLTags("<p><em>lorem</em> <strong>ipsum</strong></p>"); // 'lorem ipsum'
