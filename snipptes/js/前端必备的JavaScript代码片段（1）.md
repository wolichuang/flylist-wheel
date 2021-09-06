# 前端必备的JavaScript代码片段（1）

## 是什么

汇总一些工作中用到的前端代码块，方便反复查阅。

## 代码块

1. 获取 url 参数
2. 获取文件后缀名
3. 生成随机字符串
4. 字符串截取函数
5. 数组函数
6. 数组深浅拷贝
7. 数组去重
8. sessionStorage/localStorage 工具
9. 对象合并
10. 滚动条判断
11. js视频截图
12. base64编码和解码
13. html代码encode和decode
14. sendBeacon的安全的数据上报
15. toLocaleString千分位
16. 延时执行delay
17. 禁止选择和复制
18. 禁止图片拖拽








### 获取 url 参数

场景：获取 url 参数

```js
// 获取 url 参数
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
```

### 获取文件后缀名

场景：上传文件获取后缀名

```js
// 获取文件名后缀
function getExt(filename) {
    if (typeof filename == 'string') {
        return filename.split('.').pop().toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}
```

### 生成随机字符串

场景： 生成 随机数字  和 随机字符

```js
// 随机数
const random = (min, max) => {
	if (arguments.length === 2) {
		return Math.floor(min + Math.random() * ((max + 1) - min))
	} else {
		return null;
	}
}
// 生成随机id
function uuid(length, chars) {
    let chars =
        chars ||
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    length = length || 8
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result;
}
```

### 字符串截取

场景： 处理字符串函数

```js
var str1 = "abcdef"; // "截取bc"
console.log(str1.substr(1,2)); // 取 2 个
console.log(str1.substring(1,3)); // 取 1-3 的字符
console.log(str1.slice(1,3)); // 截取 1-3

var resultStr=testStr.replace(/\ +/g,"");//去掉空格
resultStr=testStr.replace(/[ ]/g,"");    //去掉空格
resultStr=testStr.replace(/[\r\n]/g,""));//去掉回车换行
resultStr=testStr.replace(/(^\s*)|(\s*$)/g, ""); //去掉空格
resultStr=testStr.replace(/(^\s*)/g,""); //去掉左空白
resultStr=testStr.replace(/(\s*$)/g,"");//去掉右空白
```

### 数组函数

场景： 处理数组函数

```js
## arguments 方法参数转数组
var argArray = Array.prototype.slice.call(arguments);
## 判断是否是数组
Object.prototype.toString.call(arr) === '[object Array]'
## 取数组的最大值 
Math.max.apply(Math, arr); 
## 取数组的最小值 
Math.min.apply(Math, arr); 
## 下标随机
var idx = Math.floor(Math.random() * arr.length);
Math.floor(Math.random()*2) // 0到1随机数
## 排序
var arr= arr.sort(function(){ return Math.random() - 0.5});
## json 转换
var jsonText = JSON.stringify(obj);// 字符串
var jsonObj = JSON.parse(jsonText); //json对象
```

### 数组深浅拷贝

场景：只拷贝对象、数组以及对象数组。

```js
export function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj
    }
    if (obj == null) {
        return obj
    }
    return JSON.parse(JSON.stringify(obj))
}
```

### 数组去重

场景： 数组去重复

```js
// 方式一
const res1 = Array.from(new Set(arr));

// 方式二
const unique1 = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--;
        j--;
      }
    }
  }
  return arr;
};

// 方式三
const unique3 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
};
const arr = [1, 1, "1", 17, true, true, false, false, "true", "a", {}, {}];
```
### sessionStorage/localStorage 工具

场景：需要浏览器存储

```js
var storage = {
    /**
     对本地数据进行操作的相关方法，如localStorage,sessionStorage的封装
    */
    setStorage: function(key, value, duration) {
        var data = {
            value: value,
            expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
        };
        localStorage[key] = JSON.stringify(data);
    },
    getStorage: function(key) {
        var data = localStorage[key];
        if (!data || data === "null") {
            return null;
        }
        var now = this.getCurrentTimeStamp();
        var obj;
        try {
            obj = JSON.parse(data);
        } catch (e) {
            return null;
        }
        if (obj.expiryTime === 0 || obj.expiryTime > now) {
            return obj.value;
        }
        return null;
    },
    removeStorage: function(key){
        localStorage.removeItem(key);
    },
    getSession: function(key) {
        var data = sessionStorage[key];
        if (!data || data === "null") {
            return null;
        }
        return JSON.parse(data).value;

    },
    setSession: function(key, value) {
        var data = {
            value: value
        }
        sessionStorage[key] = JSON.stringify(data);
    },
    getCurrentTimeStamp: function() {
        return Date.parse(new Date());
    }
};
```

### 对象合并

场景：合并对象

```js
const person = {
  name: "wxh",
  age: 30,
};
const job = {
  name: "lxm",
  title: "test",
  site: "beijing",
};

const assign = { ...person, ...job };
console.log(assign); // { name: 'lxm', age: 30, title: 'test', site: 'beijing' }
```

### 滚动条判断

场景： 回到顶部

```js
## 回到顶部
function scrollToTop() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
};

## 判断滚动条到底部
$(document).scroll(function(){
  if($(document).scrollTop()>=$(document).height()-$(window).height(){
        console.log('到底部了')
   }
});
## 滚动到指定位置
var $ele= $('#ele'),scrollTo = $('#row_8');
    $ele.animate({
        scrollTop: scrollTo.offset().top - $ele.offset().top + 	$ele.scrollTop()
});
```

### js 视频截图

场景：视频截取图片

```js
function captureVideo(videoEl) {
  let canvasEl;
  let dataUrl;
  try {
      const cps = window.getComputedStyle(videoEl);
      const width = +cps.getPropertyValue("width").replace("px", "");
      const height = +cps.getPropertyValue("height").replace("px", "");

      canvasEl = document.createElement("canvas");
      canvasEl.style.cssText = `position:fixed;left:-9999px`;
      canvasEl.height = height;
      canvasEl.width = width;

      document.body.appendChild(canvasEl);
      
      const ctx = canvasEl.getContext("2d");
      ctx.drawImage(videoEl, 0, 0, width, height);
      // const image = canvas.toDataURL("image/png");
      dataUrl = canvasEl.toDataURL();

      document.body.removeChild(canvasEl);
      canvasEl = null;
      return dataUrl;
  } finally {
      if (canvasEl) {
          document.body.removeChild(canvasEl);
      }
      if (dataUrl) {
          return dataUrl;
      }
  }
}
```

### base64编码和解码

场景： 浏览器内置解码 base64

```js
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
```

### html代码encode和decode

```js
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    var result = div.innerHTML;
    div = null;
    return result;
}
function htmldecode(s){
    var div = document.createElement('div');
    div.innerHTML = s;
    var result = div.innerText || div.textContent;
    div = null;
    return result;
}
```

### sendBeacon的安全的数据上报

```js
function report(url, data) {
    if (typeof navigator.sendBeacon !== "function") {
        return console.error("sendBeacon不被支持");
    }
    navigator.sendBeacon(url, data);
}
window.addEventListener('unload', logData, false);
function logData() {
   report("/log", "被卸载了");
}

```

### toLocaleString千分位
```js
function formatMoney(num){
    return (+num).toLocaleString("en-US");
}
console.log(formatMoney(123456789));  // 123,456,789
console.log(formatMoney(6781)) // 6,781
console.log(formatMoney(5)) // 5

超大的数
formatMoney(19999999933333333333333) // 19,999,999,933,333,333,000,000
```

### 延时执行delay

场景： 延时执行某函数，且只会执行一次。


```js
function delay(fn = () => { }, delay = 5000, context = null) {
    let ticket = null;
    let runned = false;
    return {
        run(...args) {
            return new Promise((resolve, reject) => {
                if (runned === true) {
                    return;
                }
                runned = true;
                ticket = setTimeout(async () => {
                    try {
                        const res = await fn.apply(context, args);
                        resolve(res);
                    } catch (err) {
                        reject(err)
                    }
                }, delay)
            })
        },
        cancel: () => {
            clearTimeout(ticket);
        }
    }
}
```
### 禁止选择和复制

```js
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(ev){
        ev.preventDefault();
        ev.returnValue = false;
    })
});
body {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
```

### 禁止图片拖拽

```js
['dragstart'].forEach(function(ev){
    document.addEventListener(ev, function(ev){
        ev.preventDefault();
        ev.returnValue = false;
    })
});
```