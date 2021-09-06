# 代码块整理

## 是什么

收集 整理一些代码块，强化记忆

### 代理单例模式

```js
function buildProxy(func) {
  let instance;
  let handle = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args);
      }
      return instance;
    },
  };
  return new Proxy(func, handle);
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var singlePerson = buildProxy(Person);

var person1 = new singlePerson("wxh", "32");
var person2 = new singlePerson("wxh", "32");

console.log(person1 === person2); // True
```

### 柯里化

```js
// 函数柯里化方法
function curry(fn) {
  if (fn.length <= 1) return fn;
  const generator = (...args) => {
    if (fn.length === args.length) {
      // 执行fn并且返回执行结果
      return fn(...args);
    } else {
      return (...args2) => {
        //返回generator函数
        return generator(...args, ...args2);
      };
    }
  };
  return generator;
}
const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];
const curriedDisplay = curry(display);

console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8));
```

### 实现继承

```js
// 实现继承
//简单模拟ES6的class实现
// class Animal {
//     constructor(name) {
//         this.name = name
//     }
//
//     sleep() {
//         console.log('animal is sleeping')
//     }
//
//     static staticFunc() {
//         console.log('staticFunc')
//     }
// }
//
// class Dog extends Animal {
//     constructor(name, color) {
//         super(name)
//         this.color = color
//     }
//
//     barking() {
//         console.log('wang!')
//     }
// }

function Animal(name) {
  this.name = name;
}
Animal.staticFunc = function () {
  console.log("staticFunc");
};
Animal.prototype.sleep = function () {
  console.log("animal is sleeping");
};
function Dog(name, color) {
  Animal.call(this, name);
  this.color = color;
}

// 寄生组合式继承 + 构造函数之间的继承
function inherit(subType, superType) {
  //由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      // 指向子类，和默认的继承行为保持一致
      value: subType.constructor,
    },
  });
  //子构造函数继承父构造函数(子类继承父类的静态方法和静态属性)
  Object.setPrototypeOf(subType, superType);
}
inherit(Dog, Animal);
//需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
Dog.prototype.barking = function () {
  console.log("wang!");
};
let brownTeddy = new Dog("teddy", "brown");
Dog.staticFunc(); // staticFunc
console.log(brownTeddy); // [object Object]
brownTeddy.sleep(); // animal is sleeping
brownTeddy.barking(); //
```

### 分组数据筛选

```js
var timeArray = [
  { ctime: "20190601", title: "wxh1" },
  { ctime: "20190601", title: "wxh2" },
  { ctime: "20190601", title: "wxh3" },
  { ctime: "20190602", title: "wxh4" },
  { ctime: "20190602", title: "wxh5" },
];

const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

const reducedFilter = (array) => {
  let ctimes = [...new Set(array.map((item) => item.ctime))];
  let filterData = [];
  ctimes.forEach((ctime) => {
    filterData = groupBy(array, (item) => item.ctime);
  });
  return filterData;
};
// 使用
console.log(reducedFilter(timeArray)); // 获取数据集合
```

### 网格布局

```md
## Grid 网格布局

Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。
grid-template-columns 属性定义每一列的列宽，grid-template-rows 属性定义每一行的行高。
.row {
display: grid;
  grid-template-rows: 1fr 1fr 20px 1fr 0.8fr;
  grid-template-columns: 1fr 1fr 1fr;
}
为了方便表示比例关系，网格布局提供了 fr 关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍。

## grid 画眼睛

.head {
  display: grid;
  width:250px;
  height:250px;
  background:#222;
  border-radius: 50%;
  margin-top: 50px;
  display: grid;
  grid-template-rows: 1fr 1fr 20px 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}
.eyes {
  display: grid;
  grid-row-start: 2;
  grid-column: 1/4;
  grid-template-columns: 1fr 1fr;
}
.eyes .eye {
  width: 20%;
  height: 40%;
  background: #efefef;
  border-radius: 50%;
}
.left-eye {
  grid-column: span 1/2;
  justify-self: center;
  align-self: center;

}
.right-eye {
  grid-column: span 2/4;
  justify-self: center;
  align-self: center;
}

## 画 耳朵

.left-ear {
  width:0;
  height:0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #222;
  transform: rotate(330deg);
  margin: -40px 0 0 -20px;
  grid-column-start:1;
}
.right-ear {
  grid-column-start:3;
  width:0;
  height:0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #222;
  transform: rotate(30deg);
  margin: -40px -20px 0 0;
}
```

## 06# 动画效果 1

```
## css 雷达动画效果
.spinner {
  width: 100px;
  height: 100px;
  background: #eee;
  border-radius: 50%;
  margin: 50px;
  display: inline-block;
  position: relative;
}
.spinner:before,
.spinner:after {
  content:"";
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.spinner-3:before,
.spinner-3:after {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  background: #5ad1cd;
  opacity:0;
  animation: pulse 3s linear infinite;
}
.spinner-3:after {
  animation: pulse 2s linear 2.3 infinite;
}

@keyframes pulse {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.3);
    transform:scale(1.3);
    opacity:0;
  }
}
```

## 实现一个观察者模式

```js
//
const createStore = (reducer, initState) => {
  let store = initState;
  let listeners = [];
  const getState = () => {
    return store;
  };

  // 当执行dispatch更改状态操作时，store tree更新后，依次执行数组中的listener
  const dispatch = (action) => {
    store = reducer(store, action);
    listeners.foreach((listener) => {
      listener();
    });
  };

  // store内部维护listener数组，用于存储所有通过store.subscrib注册的listener
  // store.subscrib返回unsubscrib方法，用于注销当前listener
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => listener !== item);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
```

## 08 走马灯组件

```html
<template>
  <div class="wrap">
    <div id="box">
      <div id="marquee">{{text}}</div>
      <div id="copy"></div>
    </div>
    <div id="node">{{text}}</div>
  </div>
</template>
<script>
  export default {
    name: "Marquee",
    props: ["lists"],
    data() {
      return {
        timer: null,
        duration: 2500,
        mLeft: 0,
        text: "",
        items: [
          {
            text:
              "G2本身是一门图形语法，G2和传统的图表系统（HighCharts，ACharts等）不同，G2是一个基于统计分析的语义化数据可视化系统。它真正做到了让数据驱动图形，让你在使用它时候不用关心绘图细节，只需要知道你想通过它怎么展示你关心的数据。",
          },
          {
            text:
              "G2本身是一门图形语法，G2和传统的图表系统（HighCharts，ACharts等）不同，G2是一个基于统计分析的语义化数据可视化系统。它真正做到了让数据驱动图形，让你在使用它时候不用关心绘图细节，只需要知道你想通过它怎么展示你关心的数据。",
          },
        ],
      };
    },
    methods: {
      move() {
        // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        let width = document.getElementById("node").getBoundingClientRect()
          .width;
        let box = document.getElementById("box");
        let copy = document.getElementById("copy");
        copy.innerText = this.text; // 文字副本填充
        let distance = 0; // 位移距离
        //设置位移
        setInterval(function () {
          distance = distance - 1;
          // 如果位移超过文字宽度，则回到起点
          if (-distance >= width) {
            distance = 16;
          }
          box.style.transform = "translateX(" + distance + "px)";
        }, 20);
      },
    },
    // 把父组件传入的arr转化成字符串
    mounted: function () {
      for (let i = 0; i < this.items.length; i++) {
        this.text += " " + this.items[i].text;
      }
    },
    // 更新的时候运动
    updated: function () {
      this.move();
    },
  };
</script>

<style lang="css" scoped>
  .wrap {
    overflow: hidden;
  }
  #box {
    width: 80000%;
  }
  #box div {
    float: left;
  }
  #marquee {
    margin: 0 16px 0 0;
  }
  #node {
    position: absolute;
    z-index: -999;
    top: -999999px;
  }
</style>
```

## 09# 走马灯

```html
<style>
  * {
      margin: 0;
      padding: 0;
  }
  .box {
      margin-left: 200px;
      margin-top: 100px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      width: 300px;
      background: #000;
  }
  .content p {
      display: inline-block;
  }
  .content p.padding {
      padding-right: 300px;
  }
</style>
<div class="box">
      
  <div class="content">
            
    <p class="text">
      1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。
    </p>
        
  </div>
</div>
<script>
  let [box, content, text] = [
    document.querySelector(".box"),

    document.querySelector(".content"),

    document.querySelector(".text"),
  ];

  let [textWidth, boxWidth] = [text.offsetWidth, box.offsetWidth];

  window.onload = function checkScrollLeft() {
    // 判断文字长度是否大于盒子长度

    if (boxWidth > textWidth) {
      return false;
    }

    content.innerHTML += content.innerHTML;

    document.querySelector(".text").classList.add("padding"); // 更新

    textWidth = document.querySelector(".text").offsetWidth;
    toScrollLeft();
  };
  function toScrollLeft() {
    //  如果文字长度大于滚动条距离，则递归拖动
    if (textWidth > box.scrollLeft) {
      box.scrollLeft++;
      setTimeout("toScrollLeft()", 18);
    } else {
      // setTimeout("fun2()",2000);
    }
  }
  function toScrollLeft() {
    //  如果文字长度大于滚动条距离，则递归拖动
    if (textWidth > box.scrollLeft) {
      box.scrollLeft++;
      setTimeout("toScrollLeft()", 18);
    } else {
      // 滚动结束 触发事件
    }
  }
  window.onload = function checkScrollLeft() {
    // 判断文字长度是否大于盒子长度

    if (boxWidth >= textWidth) {
      return false;
    }

    content.innerHTML += content.innerHTML;

    document.querySelector(".text").classList.add("padding"); // 更新

    textWidth = document.querySelector(".text").offsetWidth; // 开始滚动  触发事件

    toScrollLeft();
  };
</script>
```

## 10 费曼学习法

```
## 费曼学习法
所谓的费曼学习法就是当你学习了一个新知识后，想象自己是一个老师：
用简单的话，用自己的话去复述表达知识，绝对不能用行业术语，并且想象你是在给一个80多岁或者8岁的小孩子去讲，最后他们都能听懂。

讨论 实践  教授她人
我们理解一个新事物的过程，并不是凭空冒出来的，而是找到已有的相关概念，并把他们连接起来，组成一个新概念。
第一步：在一张白纸上写上你已经学到的新知识或概念

第二步：想象你是一名老师，你要给台下的小学生讲授这个概念，这个时候你要把自己对这个知识的理解写下来，越清楚越好，这个时候你会发现哪里理解的不够，哪里理解的比较清晰。

第三步：当你觉得哪里卡壳了，就回到原来的材料中，继续学习重新理解。

第四步：检查自己的讲述是否准确，是否啰嗦，哪里可以简练，哪里需要用生活案例去举例，去类比。

## 火焰
普通火焰常见的能量源就是化学上的氧化反应，因为氧气的大量存在，使得放热的氧化反应太容易发生 物质的电子在吸收了高能能量后，进入激发态挣脱原子束缚发生跃迁，释放能量，发出耀眼的光，不仅气体会，固体也会，比如灯泡的钨丝。为什么氧会变成铁。因为铁是裂变和聚变的最终终点啊，铁原子的能级最低，比铁原子重的铀裂变会释放能量，比铁原子轻的氢聚变会释放能量，理论上铁元素原子量以上的元素都可以裂变，铁以下的元素都可以聚变。
## 后端技术站
语言：用了哪些开发语言，如：C++/Java/Go/PHP/Python/Ruby 等等。
组件：用了哪些组件，如：MQ 组件，数据库组件等等。
流程：怎样的流程和规范，如：开发流程，项目流程，发布流程，监控告警流程，代码规范等等。
系统：系统化建设，上面的流程需要有系统来保证，如：规范发布流程的发布系统，代码管理系统等等。

```

### 视频切割

```js
## 防盗链
目前的云存储服务商大部分都支持referer防盗链。其原理就是在访问资源时，请求头会带上发起请求的页面地址，判断其不存在（表示直接访问图片地址）或不在白名单内，即为盗链。
在web领域，Blob对象表示一个只读原始数据的类文件对象，虽然是二进制原始数据但是类似文件的对象，因此可以像操作文件对象一样操作Blob对象。
### blob 转 arrayBuffer
//创建一个以二进制数据存储的html文件
const text = "<div>hello world</div>";
const blob = new Blob([text], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
//以文本读取
const textReader = new FileReader();
textReader.readAsText(blob);
textReader.onload = function() {
  console.log(textReader.result); // <div>hello world</div>
};
//以ArrayBuffer形式读取
const bufReader = new FileReader();
bufReader.readAsArrayBuffer(blob);
bufReader.onload = function() {
  console.log(new Uint8Array(bufReader.result)); // Uint8Array(22) [60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]
};
### arrayBuffer 转 Blob
//我们直接创建一个Uint8Array并填入上面的数据
const u8Buf = new Uint8Array([60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]);
const u8Blob = new Blob([u8Buf], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
const textReader = new FileReader();

textReader.readAsText(u8Blob);
textReader.onload = function() {
  console.log(textReader.result); // 同样得到div>hello world</div>
};

### 视频地址转换
const objectURL = URL.createObjectURL(object);
### 视频进行转化
const video = document.querySelector('video');
//视频资源存放路径，假设下面有5个分段视频 video1.mp4 ~ video5.mp4，第一个段为初始化视频init.mp4
const assetURL = "http://www.demo.com";
//视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'; 
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource); //将video与MediaSource绑定，此处生成一个Blob URL
  mediaSource.addEventListener('sourceopen', sourceOpen); //可以理解为容器打开
} else {
  //浏览器不支持该视频格式
  console.error('Unsupported MIME type or codec: ', mimeCodec);
}

function sourceOpen () {
  const mediaSource = this;
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  function getNextVideo(url) {
    //ajax代码实现翻看上文，数据请求类型为arraybuffer
    ajax(url, function(buf) {
      //往容器中添加请求到的数据，不会影响当下的视频播放。
      sourceBuffer.appendBuffer(buf);
    });
  }
  //每次appendBuffer数据更新完之后就会触发
  sourceBuffer.addEventListener("updateend", function() {
    if (i === 1) {
      //第一个初始化视频加载完就开始播放
      video.play();
    }
    if (i < 6) {
      //一段视频加载完成后，请求下一段视频
      getNextVideo(`${assetURL}/video${i}.mp4`);
    }
    if (i === 6) {
      //全部视频片段加载完关闭容器
      mediaSource.endOfStream();
      URL.revokeObjectURL(video.src); //Blob URL已经使用并加载，不需要再次使用的话可以释放掉。
    }
    i++;
  });
  //加载初始视频
  getNextVideo(`${assetURL}/init.mp4`);
};

### 视频文件格式判断
mp4fragment video.mp4 video-fragmented.mp4

### 视频切割
mp4split video.mp4 --media-segment video-%llu.mp4 --pattern-parameters N
```

### puppeter 抓取页面

```js
## puppeteer

cnpm i puppeteer -S
### puppeteer.launch([object]):
通过 puppeteer.launch([object]) 创建一个 Browser 对象

### browser.newPage()
通过 browser.newPage() 创建一个新的 Page 对象，在浏览器中会打开一个新的标签页。

### page.goto(url[, options])
根据传入的url，页面导航去相应的页面，它也通过接收一个非必须的对象参数进行配置。
可以设置字段包括 timeout (跳转等待时限), waitUntil (满足什么条件认为页面跳转完成，默认为load)。

### page.$$eval(selector, pageFunction[, ...args])
selector是选择器，如'.class', '#id', 'a[href]'等

pageFunction是在浏览器实例上下文中要执行的方法

...args是要传给 pageFunction 的参数。

其作用相当于在页面上执行 Array.from(document.querySelectorAll(selector))，然后把匹配到的元素数组作为第一个参数传给 pageFunction 并执行，返回的结果也是 pageFunction 返回的。

而 page.evaluate(pageFunction) 有大致相同的功能，还更灵活。

### browser.close()

### 代码
const puppeteer = require('puppeteer');

const url = 'https://weibo.com/?category=novelty';
const sleep = (time) => new Promise((resolve, reject) => { // 因为中间包含一次人为设置的跳转所以只好搞一个sleep等跳转
  setTimeout(() => {
    resolve(true);
  }, time);
})
async function getindex(url) {
  const browser = await puppeteer.launch({  // 一个浏览器对象
    headless: false // puppeteer的功能很强大，但这里用不到无头，就关了
  });
  const page = await browser.newPage(); // 创建一个新页面
  await page.goto(url, { // 跳转到想要的url，并设置跳转等待时间
    timeout: 60000
  });
  await sleep(60000); // 等待第二次跳转完成
  const data = await page.$$eval('.UG_list_b', (lists) => { // 相当于document.querySelectorAll('.UG_list_b')
    var newarr = [Array.from(lists)[0]] // 因为只要第一个，所以把其他的去掉了，若要所有的结果直接取Array.from(lists)即可
    return newarr.map(node => { // 遍历数组选择标题
      const title = node.querySelector('.list_des .list_title_b a').innerText;
      return title;
    })
  });
  browser.close(); // 关闭浏览器
  return data;
}
// 抓取数据
getindex(url)
  .then(res => {
    console.log(res);
  })
```

### 等分 body

```css
body {
      margin: 0;
      display: grid;
      height: 100%;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      grid-gap: 30px;
      padding: 30px;
}
.bg-card {
  background: #fff;
  padding: 5px;
  border: 1px solid #fcfcfc;
  height: 220px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
}
```

### set 函数

```js
## Set 算法的使用
set 是一个键的集合，它不使用索引，而是使用键对数据排序。 set 中元素按插入的顺序是可迭代的，它不能包含重复的数据，set 的每一项必须是唯一的。
set 相对于数组来说，定位元素相对较快，可以针对value 来删除一项（splice）.可以快速数组去重复。不能使用 indexOf 或 include 查找 NaN值。而 set 可以保存此值。相比之下，Set用于搜索、删除和插入元素的方法的时间复杂度都只有O(1)，这意味着数据的大小实际上与这些方法的运行时间无关。时间复杂度为0(N)。换句话说，运行时间的增长速度与数据大小的增长速度相同。
var set = new Set();
set.add('wxh');
set.has('h');
set.remove('x') // index!==-1 && arr.splice(index,1)
## 求数组中两数的和为 一值
const SUM = 9; // 求和
const arrs = [3,5,1,4]; // 数组
const findSum = () => {
	let values = new Set();
	let datas = [];
	values.add(SUM - arrs[0]); // 存入一个值
	// 循环数组
	for (let i = 1, length = arr.length; i < length; i++) {
		let val = SUM - arrs[i];
		if(values.has(arrs[i])) {
			datas.push([arrs[i],SUM-arrs[i]]);
			console.log(datas);
			return true;
		}else {
			values.add(val); // 存入新的值 set 自动数组去重复
		}
	};
	return false;
}
// 简洁版本
const findSum = (arr, sum) =>
  arr.some((set => n => set.has(n) || !set.add(sum - n))(new Set));

console.log(findSum()); // [5,4] true
```

### json.parse 垫片

```js
if (typeof JSON.parse !== "function") {
  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  JSON.parse = function (text, reviver) {
    // The parse method takes a text and an optional reviver function, and returns
    // a JavaScript value if the text is a valid JSON text.
    var j;
    function walk(holder, key) {
      // The walk method is used to recursively walk the resulting structure so
      // that modifications can be made.

      var k;
      var v;
      var value = holder[key];
      if (value && typeof value === "object") {
        for (k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            v = walk(value, k);
            if (v !== undefined) {
              value[k] = v;
            } else {
              delete value[k];
            }
          }
        }
      }
      return reviver.call(holder, key, value);
    }

    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.

    text = String(text);
    rx_dangerous.lastIndex = 0;
    if (rx_dangerous.test(text)) {
      text = text.replace(rx_dangerous, function (a) {
        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with "()" and "new"
    // because they can cause invocation, and "=" because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
    // replace all simple value tokens with "]" characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or "]" or
    // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

    if (
      rx_one.test(
        text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
      )
    ) {
      // In the third stage we use the eval function to compile the text into a
      // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
      // in JavaScript: it can begin a block or an object literal. We wrap the text
      // in parens to eliminate the ambiguity.

      j = eval("(" + text + ")"); // 核心点

      // In the optional fourth stage, we recursively walk the new structure, passing
      // each name/value pair to a reviver function for possible transformation.

      return typeof reviver === "function"
        ? walk(
            {
              "": j,
            },
            ""
          )
        : j;
    }

    throw new SyntaxError("JSON.parse");
  };
}
```

### json.stringfy 垫片

```js
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object" || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    arr = obj && obj.constructor === Array;
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

console.log(jsonStringify({ x: 5, y: 12, t: { a: 5 } }));
//{"x":5,"y":12,"t":{"a":5}}
```

### 删除按钮

```css
.del-icon {
  position: absolute;
  right:30px;
  top:0px;
  display: inline-block;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.del-icon:before,.del-icon:after {
  position: absolute;
  right: 0px;
  top: 0px;
  content: "";
  width:2px;
  height:12px;
  background:#000;
  border-radius:2px;
  transition: all .25s ease;
}
.del-icon:before {
  transform: translate(15px,10px) rotate(-45deg);
}
.del-icon:after {
  transform: translate(15px,10px) rotate(45deg);
}
```

### css3 常用

```cs
## body 布局
body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100vh;
  width: 100%;
  font-size: 14px;
}

## 背景色
background: linear-gradient(to top, #49b26e 0%, #57d895 100%);box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
## 移动
transition: all .3s ease-in-out;
## 动画
animation: button .5s ease both, fill .5s ease-out 1.5s forwards;
```

### 事件循环

```js
// 使用var关键字声明的变量在JavaScript中会被提升，并在内存中分配值undefined
var a = 10;
function foo() {
    // 创建了未初始化的'a' a = undefined
    console.log(a); // undefined 如果注释了 a= 20 输出 10
    var a = 20;
}
foo();
// 有一个所谓的暂时死区(TDZ)。试图访问TDZ中的这些变量将引发ReferenceError,因为只有在执行到达声明时才能访问它们。
var a = 10;
function foo() {
    console.log(a); // ReferenceError
    let a = 20;
}
foo();

// code2
// 闭包 封装三个函数体指向的是同一个绑定 i=3
var array = [];
for(var i = 0; i <3; i++) {
 array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // [ 3,3,3 ] , 改成 let i=0 ,每个'i'指的是一个新的的绑定，并保留当前的值。[0,1,2]

let array = [];
for (var i = 0; i < 3; i++) {

  array[i] = (function(x) {
    return function() {
      return x;
    };
  })(i);
}
const newArray = array.map(el => el());
console.log(newArray); // [0, 1, 2]  

// code3
// 浏览器的主要组件包括调用堆栈，事件循环，任务队列和Web API。 像setTimeout，setInterval和Promise这样的全局函数不是JavaScript的一部分，而是 Web API 的一部分。 
// JS调用栈是后进先出(LIFO)的。引擎每次从堆栈中取出一个函数，然后从上到下依次运行代码。每当它遇到一些异步代码，如setTimeout，它就把它交给Web API(箭头1)。因此，每当事件被触发时，callback 都会被发送到任务队列（箭头2）。
// 事件循环(Event loop)不断地监视任务队列(Task Queue)，并按它们排队的顺序一次处理一个回调。每当调用堆栈(call stack)为空时，Event loop获取回调并将其放入堆栈(stack )(箭头3)中进行处理。请记住，如果调用堆栈不是空的，则事件循环不会将任何回调推入堆栈。

function foo() {
  setTimeout(foo, 0); // 不会
};
// 在底层来看，JavaScript中有宏任务和微任务。setTimeout回调是宏任务，而Promise回调是微任务。

// 主要的区别在于他们的执行方式。宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此，如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务。只有当微任务队列为空时，事件循环才会重新渲染页面、

function foo() {
  return Promise.resolve().then(foo);
};

// 因此事件循环无法继续处理其他事件（滚动，单击等），直到该队列完全清空为止。 因此，它会阻止渲染。

// code4
var obj = { x: 1, y: 2, z: 3 };
[...obj]; // TypeError
obj[Symbol.iterator] = function() {
  return {
    next: function() {
        if(this._countDown == 3) {
          const last = this._countDown
          return {value: last, done: true}
        }
        this._countDown = this._countDown + 1;
        return {value:this._countDown, done: false}
    },
    _countDown: 0
  }
}
console.log([...obj])

## code5
### for-in循环遍历对象本身的可枚举属性以及对象从其原型继承的属性。
var obj = { a: 1, b: 2 };
Object.setPrototypeOf(obj, {c: 3});
Object.defineProperty(obj, 'd', { value: 4, enumerable: true });
// a b c d
for(let prop in obj) {
    console.log(prop);
}  

## code6
### this 始终指向调用方法的对象。因此，在foo.getx()的例子中，它指向foo对象，返回90的值。而在xGetter()的情况下，this指向 window对象, 返回 window 中的x的值，即10
var x = 10;
var foo = {
  x: 90,
  getX: function() {
    return this.x;
  }
};
console.log(foo.getX()); // prints 90
var xGetter = foo.getX;
console.log(xGetter()); // prints 10
```

### 动画-移动

```html
<!-- animation 向前移动动画 -->
<style>
  span {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0px;
    animation: move 5s ease-in-out 0s 1 alternate forwards;
  }
  .line {
    display: block;
    position: absolute;
    left: 10%;
    top: 0px;
    background: url(../images/icons/icons_line.png) no-repeat;
    width: 20px;
    height: 74px;
    background-size: 50%;
  }

  @keyframes move {
    0% {
      width: 0%;
    }
    50% {
      width: 35%;
    }
    100% {
      width: 95%;
    }
  }
</style>

<span><em class="line" :style="{left:(score[3]/100) * 100 + '%'}"></em></span>
```

### 数组去重

```js
// 数组去重
const cars = [
    'Mazda',
    'Ford',
    'Renault',
    'Opel',
    'Mazda'
]
console.log([...new Set(cars)])
console.log(Array.from(new Set(cars)))
## 对象合并
const obj3 = { ...obj1, ...obj2}
## 取对象键值
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];
const result = cities.reduce((acc,item) => {
    return {
      ...acc,
      [item.name]: item.visited
    }
},{})
console.log(result) // [{Berlin: "no",Genoa: "yes"}]

## 获取数组对象的值
const cityNames = Array.from(cities, ({ name }) => name)
console.log(cityNames) // ["Paris", "Lyon", "Marseille"]

## 动态属性名
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
console.log(user); // outputs { name: "John", email: "john@doe.com" }
```

### 实现 call 函数

```js
## 实现一个 call 函数
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
} 

## 实现一个 apply 函数
Function.prototype.myapply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

## 实现一个 bind 函数
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let _this = this
  let arg = [...arguments].slice(1)
  return function F() {
    // 处理函数使用new的情况
    if (this instanceof F) {
      return new _this(...arg, ...arguments)
    } else {
      return _this.apply(context, arg.concat(...arguments))
    }
  }
}
```

### object.create

```js
## Object.create的基本实现原理
function create(obj) {
function F() {}
F.prototype = obj
return new F()

## new本质
function myNew (fun) {
  return function () {
    // 创建一个新对象且将其隐式原型指向构造函数原型
    let obj = {
      __proto__ : fun.prototype
    }
    // 执行构造函数
    fun.call(obj, ...arguments)
    // 返回该对象
    return obj
  }
}

function person(name, age) {
  this.name = name
  this.age = age
}
let obj = myNew(person)('chen', 18) // {name: "chen", age: 18}
```

### promise

```js
## 实现一个基本的Promise

// ①自动执行函数，②三个状态，③then
class Promise {
  constructor (fn) {
    // 三个状态
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }
    let reject = value => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = value
      }
    }
    // 自动执行函数
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  // then
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case 'fulfilled':
        onFulfilled()
        break
      case 'rejected':
        onRejected()
        break
      default:
    }
  }
}

## 实现浅拷贝
// 1. ...实现
let copy1 = {...{x:1}}

// 2. Object.assign实现
let copy2 = Object.assign({}, {x:1})

## 实现一个基本的深拷贝
// 1. JOSN.stringify()/JSON.parse()
let obj = {a: 1, b: {x: 3}}
JSON.parse(JSON.stringify(obj))

// 2. 递归拷贝
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return copy
}
```

### setTimeout

```js
## 使用setTimeout模拟setInterval
// 可避免setInterval因执行时间导致的间隔执行时间不一致
setTimeout (function () {
  // do something
  setTimeout (arguments.callee, 500)
}, 500)

## js实现一个继承方法
// 借用构造函数继承实例属性
function Child () {
  Parent.call(this)
}
// 寄生继承原型属性
(function () {
  let Super = function () {}
  Super.prototype = Parent.prototype
  Child.prototype = new Super()
})()
```

### 实现 EventBus

```js
## 实现一个基本的Event Bus
// 组件通信，一个触发与监听的过程
class EventEmitter {
  constructor () {
    // 存储事件
    this.events = this.events || new Map()
  }
  // 监听事件
  addListener (type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, fn)
    }
  }
  // 触发事件
  emit (type) {
    let handle = this.events.get(type)
    handle.apply(this, [...arguments].slice(1))
  }
}

// 测试
let emitter = new EventEmitter()
// 监听事件
emitter.addListener('ages', age => {
  console.log(age)
})
// 触发事件
emitter.emit('ages', 18)  // 18
```

### 实现双向绑定

```js
## 实现一个双向数据绑定
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
    return obj['text']
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
    obj['text'] = newVal
  }
})
input.addEventListener('keyup', function(e) {
  obj.text = e.target.value
})
```

### 实现 路由

```js
## 实现一个简单路由
class Route{
  constructor(){
    // 路由存储对象
    this.routes = {}
    // 当前hash
    this.currentHash = ''
    // 绑定this，避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this)
    // 监听
    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }
  // 存储
  storeRoute (path, cb) {
    this.routes[path] = cb || function () {}
  }
  // 更新
  freshRoute () {
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }
}
```

### 底部加载图片

```js
## 实现懒加载
<ul>
  <li><img src="./imgs/default.png" data="./imgs/1.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/2.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/3.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/4.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/5.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/6.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/7.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/8.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/9.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/10.png" alt=""></li>
</ul>

let imgs =  document.querySelectorAll('img')
// 可视区高度
let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
function lazyLoad () {
  // 滚动卷去的高度
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  for (let i = 0; i < imgs.length; i ++) {
    // 得到图片顶部距离可视区顶部的距离
    let x = clientHeight + scrollTop - imgs[i].offsetTop
    // 图片在可视区内
    if (x > 0 && x < clientHeight+imgs[i].height) {
      imgs[i].src = imgs[i].getAttribute('data')
    } 
  }      
}
 setInterval(lazyLoad, 1000)
```

### 实现 ajax

```js
## rem实现原理
function setRem () {
  let doc = document.documentElement
  let width = doc.getBoundingClientRect().width
  // 假设设计稿为宽750，则rem为10px
  let rem = width / 75
  doc.style.fontSize = rem + 'px'
}

## 手写 ajax
// 1. 简单实现

// 实例化
let xhr = new XMLHttpRequest()
// 初始化
xhr.open(method, url, async)
// 发送请求
xhr.send(data)
// 设置状态变化回调处理请求结果
xhr.onreadystatechange = () => {
  if (xhr.readyStatus === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}

// 2. 基于promise实现 

function ajax (options) {
  // 请求地址
  const url = options.url
  // 请求方法
  const method = options.method.toLocaleLowerCase() || 'get'
  // 默认为异步true
  const async = options.async
  // 请求参数
  const data = options.data
  // 实例化
  const xhr = new XMLHttpRequest()
  // 请求超时
  if (options.timeout && options.timeout > 0) {
    xhr.timeout = options.timeout
  }
  // 返回一个Promise实例
  return new Promise ((resolve, reject) => {
    xhr.ontimeout = () => reject && reject('请求超时')
    // 监听状态变化回调
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        // 200-300 之间表示请求成功，304资源未变，取缓存
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          resolve && resolve(xhr.responseText)
        } else {
          reject && reject()
        }
      }
    }
    // 错误回调
    xhr.onerror = err => reject && reject(err)
    let paramArr = []
    let encodeData
    // 处理请求参数
    if (data instanceof Object) {
      for (let key in data) {
        // 参数拼接需要通过 encodeURIComponent 进行编码
        paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      }
      encodeData = paramArr.join('&')
    }
    // get请求拼接参数
    if (method === 'get') {
      // 检测url中是否已存在 ? 及其位置
      const index = url.indexOf('?')
      if (index === -1) url += '?'
      else if (index !== url.length -1) url += '&'
      // 拼接url
      url += encodeData
    }
    // 初始化
    xhr.open(method, url, async)
    // 发送请求
    if (method === 'get') xhr.send(null)
    else {
      // post 方式需要设置请求头
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
      xhr.send(encodeData)
    }
  })
}
```
