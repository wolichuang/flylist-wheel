# 代码块整理

## 是什么

收集 整理一些代码块，强化记忆

## 01# 实现-工具类

```
## 模拟 jquery 操作代码
(function(window) {
    if(!window.$wx) {
        window.$wx = {};
    }

    window.$wx = {
        VERSION:'0.0.1',
        getId:function(ele){
            return "string"== typeof ele ? document.getElementById(ele) : ele;
        },
        getClass:function(cls,tag){
            var ele=[],all=document.getElementsByTagName(tag||"*");
            for(var i=0;i<all.length;i++){
                if(all[i].className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))){
                    ele[ele.length]=all[i];
                }
            }
            return ele;
        },
        hasClass:function(cls,ele){
            return new RegExp("(^|\\s)"+cls+"(\\s|$)").test(ele.className);
        },
        addClass:function(cls,ele){
            if (!this.hasClass(cls,ele)) ele.className += " "+ cls;
        },
        removeClass:function(cls,ele){
            if (this.hasClass(cls,ele)) {
                var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                ele.className=ele.className.replace(reg,'');
            }
        },
        getAttr:function(eles){
            var pairs = new Array();
            for (var i = 0, len = eles.attributes.length; i < len; i++) {
                var attrName = eles.attributes[i].nodeName;
                var attrValue = eles.attributes[i].nodeValue;
                if (eles.attributes[i].specified) {
                    pairs.push(attrName + "=\"" + attrValue + "\"");
                }
            }
            return pairs.join(" ");
        },
        getText:function(ele){
            return (typeof ele.textContent =="string") ? ele.textContent : ele.innerText;
        },
        setText:function(ele,text){
            if(typeof ele.textContent =="string"){
                ele.textContent = text;
            }else{
                ele.innerText = text;
            }
        },
    }
})(window)
```
## 02# scroll:overflow-hidden
```
## scroll overflow-hidden
开发过程中，大家应该都见到过这么一个行为：子容器滚动条滚动到底，会带动父容器一起滚动。要解决这个问题，通常我们可以通过监听子容器的事件，然后调用 preventDefault 或是将父容器的 overflow 临时设置为 hidden。这种行为又称为连锁滚动（scroll chaining）。
BFF全称是Backends For Frontends(服务于前端的后端)。BFF就是服务器设计API时会考虑到不同设备的需求，也就是为不同的设备提供不同的API接口，虽然它们可能是实现相同的功能，但因为不同设备的特殊性，它们对服务端的API访问也各有其特点，需要区别处理。
## 如何解决大量计算对 UI 渲染阻塞的问题
1. 第一种解决办法：将这种 CPU 密集型任务移到 Server 端计算
2. 第二种解决办法：使用 setTimeout 拆分密集型任务
3. 第三种解决办法：使用 Web Worker 方式,Web Worker 是一个独立的线程（独立的执行环境），这就意味着它可以完全和 UI 线程（主线程）并行的执行 js 代码，从而不会阻塞 UI，它和主线程是通过 onmessage 和 postMessage 接口进行通信的。
限制：无法访问 DOM 元素、window、document。无法访问 LocalStorage。Web Worker 不支持跨域。无法和主线程共享内存、worker 之间也无法共享内存，所以无需保护数据
。如果多个线程都在试着更新同一个元素，那简直就是个灾难
```
## 03# nodejs 路径
```
## nodejs 路径分类
分为5类：dirname,filename,process.cwd(),./,../,其中dirname,filename,process.cwd()绝对路径
1. __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
2. __filename: 总是返回被执行的 js 的绝对路径
3. process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
4. ./: 跟 process.cwd() 一样，返回 node 命令时所在的文件夹的绝对路径
// 当前目录下
path.dirname(__filename) + '/path.js'; 
// 相邻目录下
path.resolve(__dirname, '../regx/regx.js');
// 规范路径
path.normalize('/data/Desktop//foo/..');
// 拼接路径 区分 window 和 unix
path.join('src', 'task.js');
// 路径转换成 json
path.parse('/data/Desktop//代码pra/..')
// 输出文件夹下的所有文件
path.basename('/data/Desktop/','.js')
// 返回文件的目录完整地址 E:/data//Desktop
path.dirname('/data/Desktop/')
// 返回后缀名 .html
path.extname('index.html')
// 返回绝对路径 D:/hello/foo/bar 
path.resolve('/foo/bar')
// 返回相对路径 ../../hello/data/demo/
path.relative('/data/demo', '')
```
## 04# 移动端适配方案
```
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            var fontSize = 16;
            docEl.style.fontSize = fontSize + 'px';
            var docStyles = getComputedStyle(docEl);
            var realFontSize = parseFloat(docStyles.fontSize);
            var scale = realFontSize / fontSize;
            console.log("realFontSize: " + realFontSize + ", scale: " + scale);
            fontSize = clientWidth / 750 * 20;
            if(isIphoneX()) fontSize = 19;
            fontSize = fontSize / scale;
            docEl.style.fontSize = fontSize + 'px';
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    // iphoneX判断
    function isIphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }

})(document, window);
```
## 05# css3 loading 效果
```
## loading 扫描效果
<div class="item">
    <div class="spinner2"></div>
    <h5>Loading<span class="dot">.</span></h5>
</div>
<style>
.dot {
  animation: fadeIn 1s linear infinite;
}
.dot:before , .dot:after {
  content: '.';
}
.dot:after {
  animation: fadeIn 2s linear infinite;
}
.spinner2 {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border: solid 30px;
  border-radius: 50%;
  border-color: transparent transparent #0099ff  transparent;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
```
## 06# 实现 set
```
## Set 实现
window.Set = window.Set || (function () {
    function Set(arr) {
        this.items = arr ? unique(arr) : [];
        this.size = this.items.length; // Array的大小
    }
    Set.prototype = {
        add: function (value) {
            // 添加元素,若元素已存在,则跳过，返回 Set 结构本身。
            if (!this.has(value)) {
                this.items.push(value);
                this.size++;
            }
            return this;
        },
        clear: function () {
            //清除所有成员，没有返回值。
            this.items = []
            this.size = 0
        },
        delete: function (value) {
            //删除某个值，返回一个布尔值，表示删除是否成功。
            return this.items.some((v, i) => {
                if(v === value){
                    this.items.splice(i,1)
                    return true
                }
                return false
            })
        },
        has: function (value) {
            //返回一个布尔值，表示该值是否为Set的成员。
            return this.items.some(v => v === value)
        },
        values: function () {
            return this.items
        },
    }
    return Set;
}());
```
## 07# 时间格式化
```
## 时间格式化
function format_date(timeStamp) {
    let date = new Date(timeStamp);
    return date.getFullYear() + "年"
        + prefix_zero(date.getMonth() + 1) + "月"
        + prefix_zero(date.getDate()) + "日 "
        + prefix_zero(date.getHours()) + ":"
        + prefix_zero(date.getMinutes());
}

// 数字格式化
function prefix_zero(num) {
    return num >= 10 ? num : "0" + num;
}

// 倒计时时间格式化
function format_time(timeStamp) {
    let day = Math.floor(timeStamp / (24 * 3600 * 1000));
    let leave1 = timeStamp % (24 * 3600 * 1000);
    let hours = Math.floor(leave1 / (3600 * 1000));
    let leave2 = leave1 % (3600 * 1000);
    let minutes = Math.floor(leave2 / (60 * 1000));
    let leave3 = leave2 % (60 * 1000);
    let seconds = Math.floor(leave3 / 1000);
    if (day) return day + "天" + hours + "小时" + minutes + "分";
    if (hours) return hours + "小时" + minutes + "分" + seconds + "秒";
    if (minutes) return minutes + "分" + seconds + "秒";
    if (seconds) return seconds + "秒";
    return "时间到！";
}
## 全屏
function toFullScreen(){
    let elem = document.body;
    elem.webkitRequestFullScreen 
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert("浏览器不支持全屏");
}

## 退出全屏
function exitFullscreen(){
    let elem = parent.document;
    elem.webkitCancelFullScreen 
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert("切换失败,可尝试Esc退出");
}
```
## 08# 禁用键盘事件
```
## 禁止某些键盘事件
document.addEventListener('keydown', function(event){
    return !(
        112 == event.keyCode || //F1
        123 == event.keyCode || //F12
        event.ctrlKey && 82 == event.keyCode || //ctrl + R
        event.ctrlKey && 78 == event.keyCode || //ctrl + N
        event.shiftKey && 121 == event.keyCode || //shift + F10
        event.altKey && 115 == event.keyCode || //alt + F4
        "A" == event.srcElement.tagName && event.shiftKey //shift + 点击a标签
    ) || (event.returnValue = false)
```
## });

09# async/await
```
## async / await
// async/await
async getBooksByAuthorWithAwait(authorId) {
    const books = await bookModel.fetchAll();  
    return books.filter(b => b.authorId === authorId);
}
// promise
getBooksByAuthorWithPromise(authorId) { 
    return bookModel.fetchAll()
        .then(books => books.filter(b => b.authorId === authorId));
}
```
## 10# vue 组件之间通信
```
## vue 组件之间通信
### props/$emit
父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。
### 父组件向子组件传值
// App.vue
<template>
	<div id="app">
		<h1>父 子 组件传值</h1>
	    <users v-bind:users="users"></users>
	</div>
</template>
<script>
import Users from '../components/Users';
export default {
  name: 'App',
  data () {
    return {
    	users:["Henry","Bucky","Emily"]
    }
  },
  components: {
  	 Users
  }
}
</script>
// 子组件 Users
props: {
  //这个就是父组件中子标签自定义名字
  users:{          
    type:Array,
    required:true
  }
}

### 子组件向父组件传值（通过事件形式）
// Users.vue
<a href="javascript:void(0);" @click="changeTitle">{{title}}</a>
// methods
changeTitle() {
  this.$emit('titleChanged','我是子 向 父 传递的值')
}
// App.vue
<users v-bind:users="users" @titleChanged="updateTitle"></users>
<h2>{{title}}</h2>
// methods
updateTitle(prop) {
	this.title = prop;
}

### $emit/$on

这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。
var Event=new Vue();
    Event.$emit(事件名,数据);
    Event.$on(事件名,data => {});

<div id="itany">
    <my-a></my-a>
    <my-b></my-b>
    <my-c></my-c>
</div>
<template id="a">
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>
<template id="b">
  <div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
</template>
<template id="c">
  <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
</template>
<script>
var Event = new Vue();//定义一个空的Vue实例
var A = {
    template: '#a',
    data() {
      return {
        name: 'tom'
      }
    },
    methods: {
      send() {
        Event.$emit('data-a', this.name);
      }
    }
}
var B = {
    template: '#b',
    data() {
      return {
        age: 20
      }
    },
    methods: {
      send() {
        Event.$emit('data-b', this.age);
      }
    }
}
var C = {
    template: '#c',
    data() {
      return {
        name: '',
        age: ""
      }
    },
    mounted() {//在模板编译完成后执行
     Event.$on('data-a',name => {
         this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
     })
     Event.$on('data-b',age => {
         this.age = age;
     })
    }
}
var vm = new Vue({
    el: '#itany',
    components: {
      'my-a': A,
      'my-b': B,
      'my-c': C
    }
});    
```
</script>


## 11# npm 升级
```
## npm 升级
```
npm -v
npm install -g npm
npm -g install npm@2.9.1
```
### cnpm 升级
```
npm install -g cnpm --registry=http://registry.npm.taobao.org
```
## node 升级

## yarn 升级
```
npm install yarn@latest -g
npm view yarn version
yarn upgrade v1.21.3
yarn upgrade @angular
```
## ```

12# vuex
```
## vuex 跨组件通信
Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。
## vuex 和 localStorage
vuex 是 vue 的状态管理器，存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态，具体做法应该在vuex里数据改变的时候把数据拷贝一份保存到localStorage里面，刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state。
let defaultCity = "上海"
try {   
  // 用户关闭了本地存储功能，此时在外层加个try...catch
  if (!defaultCity){
    defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
  }
}catch(e){}
export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      try {
      window.localStorage.setItem('defaultCity', JSON.stringify(state.city));
      // 数据改变的时候把数据拷贝一份保存到localStorage里面
      } catch (e) {}
    }
  }
})

```
## 13# vue 之 $attr/$listeners
```
## $attrs/$listeners
Vue2.4提供了$attrs , $listeners 来传递数据与事件，跨级组件之间的通讯变得更简单。
// childCom1.vue
<template class="border">
  <div>
    <p>foo: {{ foo }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    foo: String // foo作为props属性绑定
  },
  created() {
    console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
  }
};
</script>

// Attr.vue
<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("../components/childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  }
};
</script>
```
## 14# maps
```
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s.size === 2);
console.log(s.has("hello") === true);

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.log(wm.size === undefined);

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
```
## 15# promise
```
## promise
// promise解决了异步回调嵌套的问题.异步不仅是ajax
// 执行一个异步操作,正在执行，成功，失败.
// 回调中有两个参数,第一个表示成功，第二个表示失败
let promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        // 执行了一些异步操作
        // if()
        console.log('我是在进行一些异步操作');
        if(false){
            resolve(); //执行成功的话就调用该方法;
        }else{
            reject();  // 执行的异步代码失败后执行;
        }
    },2000);
});
// 这个then方法里的参数是异步结果出来后的回调。
promise.then(function(){
    console.log('我知道了，你执行成功了！！！');
},function(){
    console.error('我知道你代码执行失败了！');
});
console.log(promise);
```
## 16# 作用域
```
## 块级作用域
块级声明 用于声明在指定块的作用域之外无法访问的变量。作用范围在{}之间

let声明：替换var 声明变量，用于提升变量作用域，常被定义在封闭代码块的顶部。它禁止重复声明

const声明：替换var 声明变量，用于声明常量，赋值后不可更改。特点如果常量是对象，则对象的属性可以修改。

临时死区：如果在声明变量之前访问这些变量，这些位置是临时死区（TDZ） 特例：如果变量在{}之外被调用 返回undefined

```
function getValue(c){
  if(c){
    let value = "12";
    return value;
  }else{
    return value;
  }
}

console.log(getValue(0)); // undefind 或 error
```

## 循环中的块级作用绑定

### var 中的循环

在循环内部，IIFE表达式为接受每一个i都创建一个副本并存储为变量value。

```
for(var i = 0;i<10;i++){
  console.log(i) // 0-9
}
console.log(i) // 10


var funcs = [];

for(var i = 0;i<10;i++){
  funcs.push((function(value){
      return function(){
        console.log(value);
      }
  })(i));
}

funcs.forEach(function(func){
  func();
})

```

### let 中的循环

在循环内部，每次迭代循环都会创建一个新变量，并以之前迭代中同名变量的值将其初始化。

```
for(let i = 0;i<10;i++){
  console.log(i) // 0-9
}
console.log(i) // error

var funcs = [];

for(let i = 0;i<10;i++){
  funcs.push(function(){
      console.log(i);
  });
}

funcs.forEach(function(func){
  func();
})
```

### const 中的循环
在循环内部，只有在for-in 和 for-of 循环中使用才不会报错。
```
var funcs = [];
// 会报错：i++试图修改常量了
for(const i = 0;i<10;i++){
  funcs.push(function(){
      console.log(i);
  });
}
funcs.forEach(function(func){
  func()
})
```
## 全局块作用域绑定
var 用于全局作用域时，会创建一个新的全局变量作为全局对象，很可能会覆盖已经存在的全局变量。
let 和 const 会在全局作用域下创建一个新的绑定，但该绑定不会添加为全局对象的属性。
## 小结
```
## 开发中 默认使用const,只有确实需要改变变量的值的时候使用let。因为大部分变量的值确定后不应改变，会避免需要bug。

17# 字符串和正则
```
## 字符串和正则表达式

UTF-16 码位 unicode的目标是为全世界每一个字符提供全球唯一的标识符，又称作码位。

在u16中 前2 ~ 16 个码位为基本多文种平面。超过这个范围的码位则要归属于某个辅助平面。

如果要检测一个字符占用的编码单元数量，可以调用codePointAt() 方法。

如果要把一个编码单元转换成一个字符，可以调用String.fromCodePoint() 方法。

normalize() 方法 规范不同的字符进行排序或比较操作的时候常用的方法。

```
let str = "𠮷";

console.log(str.codePointAt(0)>0xFFFF);
console.log(String.fromCodePoint(134071));
console.log(str.normalize("NFD"));
```

## 正则表达式的 u 修饰符

当一个正则表达式添加了 u 修饰符时，它就从编码单元操作模式切换为字符模式，用于匹配特殊字符u16编码

## 字符串的子串识别

es6 中替代indexOf() 的方法 在一段字符串中检测另一段字符串。

- str.includes() 方法 如果在字符串中检测到指定文本则返回true,否则返回false
- str.startsWith() 方法 如果在字符串的起始部分检测到指定文本则返回 true, 否返回false
- str.endsWith() 方法 如果在字符串的结束部分检测到指定文本则返回 true, 否返回false

均接收两个参数：第一个要搜索的文本，第二个参数是搜索位置的索引值。 如果第一个参数传入一个正则表达式，会触发错误。indexOf 方法则不会报错。

es6 中新增加一个repeat方法 接收一个number参数类型。表示字符串的重复次数,返回值是一个重复后的新字符串。

## 正则表达式的 y 修饰符

粘滞修饰符，它会影响正则表达式搜索过程中的sticky 属性。只有调用exec 和 test 这些正则表达式对象的方法时候才会涉及粘滞行为。

## flags属性

```
let re = /ab/g
console.log(re.source); // ab
console.log(re.flags); // g
```

## 模板字面量

es6 模板字面量语法支持创建领域专用语言(DSL),它包含 多行字符串、基本的字符串格式、html转义。
可以使用模板字面量中的占位符功能。嵌入合法的js表达式 ${name}
```
let name = 'king';
let count = 25;
let price = 0.25;
let message = ` \`hello\` \n world  ${name} $${(count * price).toFixed(2)}`;
console.log(message);
console.log(`${`my name is ${name}`}`);
console.log(String.raw`hello\nstring`); // 原样输出 用来检查原生字符串信息
```
## 标签模板
可以执行模板字面量上的转换并返回最终的字符串值。

常用substitutions.length 来为循环计数。
```
let info = tag `hello world`;

function tag(literals,...substitutions){
  console.log(literals);
  console.log(substitutions);
}
```
## 小结
```
## 模板字面是重要的新特性，它不仅可以创建带有变量的字符串，还可以调用函数进行后期的字符串处理，很重要。

18# 函数形参
```
## 函数

### 函数形参的默认值
es6简化了形参提供默认值的过程, 只有实际参数传入undefined的时候，才会调用默认的参数值。

默认参数值对arguments对象有影响：在es5非严格模式下，函数命名参数的变化会体现在arguments对象中，但是在严格模式下arguments 对象不在随着变化是常量了。在es6中，arguments 会和es5严格模式下反映一样。

```
function add(name="li",age){
  return name + "," + age
}

console.log(add(undefined,40)); // li 40
console.log(add(null,40)); // null 40
```

### 默认参数表达式

在默认参数是函数表达式的时候，只有在函数调用时不传入第二个参数的时候，才会调用默认函数表达式进行求值。

在引用参数默认值的时候，先定义的参数不能访问后定义的参数。

函数参数有自己的作用域和临时死区，其与函数体的作用域各自独立的，也就是说参数的默认值不可访问函数体内声明的变量。

```
let value = 5;
function getValue(){
  return value++;
}

function add(first,second = getValue()){
  return first + second;
}

console.log(add(1,1)); // 1
console.log(add(1)); // 6
console.log(add(1)); // 7

function add1(first=second,second){
  return first + second;
}

console.log(add1(1,1)); //2
console.log(add1(undefined,1));// 抛出错误

```

## 处理无命名函数

在es5中 提供了arguments 对象来检查函数的所用参数。

pick 方法返回给定对象的副本，在es6中可以用不定参数实现。
```
function pick(object){
   
   let result = Object.create(null);
   
   // 从第二个参数开始
   for(let i = 1,len = arguments.length;i<len;i++){
     
      result[arguments[i]] = object[arguments[i]];
   }
  
   return result;
}

var book = {
  title:"ecmascript 6",
  author:"Zaka",
  year:2016
}

let data = pick(book,"author","year","name");

console.log(data);
```

## 不定参数

在函数命名参数前添加三个点 就表明这是一个不定参数，该参数是一个数组，包含着自他之后传入的所有参数。

使用限制：每个函数最多只能声明一个不定参数，而且一定要放在所有参数的末尾。不定参数不能用于对象字面量setter 之中。

不定参数是为了代替arguments 对象，无论是否使用不定参数，arguments对象总是包含所有传入的参数。

```
function pick(object,...keys){ 
   let result = Object.create(null);
   
   // 从第一个参数开始
   for(let i = 0,len = keys.length;i<len;i++){
     
      result[keys[i]] = object[keys[i]];
   }
  
   return result;
}

var book = {
  title:"ecmascript 6",
  author:"Zaka",
  year:2016
}

let data = pick(book,"author","year","name");

console.log(data);

// error
let object = {
  
  set name(value){
    // error
  }
}
```

### 增强的Function构造函数

```
var add = new Function("first","second=first","return first + second");
console.log(add(3,5));
```

## 展开运算符

可以指定一个数组，将他们作为各自独立的参数传入函数。


```
let values = [1,2,3,4,5];

// es5
console.log(Math.max.apply(Math,values)); // apply(方法，数组)
// es6
console.log(Math.max(...values));
```

## name 属性

用于辨别函数的定义方式

```
function dosomething(){
  
}
console.log(dosomething.name); // dosomething

var dosome = function(){
  
}
console.log(dosome.bind().name); // bound dosome
console.log((new Function()).name); // anonymous
```

## 明确函数的多重用途

在es5中 可以使用不同的方法调用创建的函数。只有通过new 调用的函数，函数内的this值将指向一个新的对象，函数最终会返回这个新对象。

在es6中 有两个不同的内部方法：[[Call]] 和 [[Construct]] 当new 一个函数的时候 会执行Construct，统称构造函数，负责创建一个实例新对象，执行函数体，this绑定在实例上。非new 一个函数调用Call，从而直接执行函数体。

```
function Person(name) {
  if(this instanceof Person) {
    this.name = name;
  }else{
    throw new Error("must new create Person");
  }
}

var p = new Person('Nia');

var p1 = Person('Nia');

console.log(p); // [object Object]
console.log(p1); // undefined

var p2 = Person.call(p,"Mike"); call(方法，字符串)

```

### 元属性

为了解决判断函数是否通过new 关键字调用的问题，es6引入 new.target这个元属性。元属性是指非对象的属性，可以提供非对象目标的补充信息。

new.target [[Construct]] 指是新创建对象实例，也就是函数体内this的构造函数。[[Call]] 方法，值为undefined。

用法：可以检测这个函数是不是通过new关键字调用的。


```
typeof new.target !== "undefined" // true 表示是 new 创建的对象

// 重构
function Person(name) {
  this.name = name;
}

function Men(name){
  Person.call(this,name);
}

var person = new Person("king");
var men = new Men("li");

console.log(person);
console.log(men);
```

## 块级函数

es5 中对 {} 各个浏览器支持的不明确

es6 中对 {} 中的任何内容都会被看做一个块级声明

块级作用域 一旦执行过程流出了代码块，函数定义立即被移除。它和let的区别是 块级会被提升到块的顶部，而let定义的函数表达式不会被提升。

es6中 块级作用域会被提升至外围函数或全局作用域的顶部。

```
"use strict";

if(true){
  
  console.log(typeof dosome); // function es5会返回error
  
  function dosome(){
    
  }
  
  // error
  let dosome = function(){
    
  }
  
}

console.log(typeof dosome); // functiion es5会返回undefined
```

## 箭头函数

箭头定义函数的新语法。由函数参数、箭头、函数体组成。

特点 

- 没有this super arguments 和 new.target绑定，由外围最近一层非箭头函数决定。
- 不能通过new 关键字调用。没有原型，没有构造函数不存在prototype属性。
- 不可以改变this绑定，函数内部的this值不可被改变，在函数的生命周期内始终保持一致。
- 不支持arguments对象，只能通过命名参数和不定参数这两种形式访问函数的参数，没有自己的arguments对象，箭头函数始终可以访问外围的arguments对象。
- 不支持重复的命名参数。
- 箭头函数的this值不受 call 、apply、bind方法影响


```
// 空函数

// es5
let dosm = function(){
  
}

// es6
let dosm = () => {
  
}

// 无参数

// es5
let getName = function(){
  return "Nika";
}

// es6
let getName1 = () => "Nika-lulul";

console.log(getName1(2,3));

// 一个参数

// es5
let refle = function(value){
  return value;
}
// es6 
let refle1 = value => value;
console.log(refle1(20));

// 两个参数

// es5
let sum = function(a,b){
  return a + b;
}

// es6
let sum1 = (a,b) => a + b;

console.log(sum1(2,3));

// 字面量参数
let items = id => ({id:id,name:"hello"});

// IIFE 立即执行函数
let person = ((name) => {
    return {
        getN :function(){
            return name;
        }
    }
})("Nika");

// 替代 this 绑定事件

//es5
let page = {
  id:"123",
  init:function(){
    document.addEventListener("click",(function(){
      this.dosome(event.type);
    }).bind(this),false);
  },
  dosome:function(type){
      console.log(type);
  }
}

page.init();

//es6
let page = {
  id:"123",
  init:function(){
    document.addEventListener("click",
      event => this.dosome(event.type),false);
  },
  dosome:function(type){
      console.log(type);
  }
}

page.init();
```

## 箭头函数和数组


```
let result = [3,4].sort((a,b) => a - b);
```

## 尾调用优化

尾调用指的是函数作为另一个函数的最后一条语句被调用。创建一个新的堆栈 将其推入调用站来表示函数调用。

不在创建新的堆栈，清除并重用当前堆栈的情况：

尾调用不访问当前堆栈的变量、在函数内部，尾调用是最后一句语句、调用结果作为函数值返回。
用于递归操作 待审核
## 小结
新增特性 默认参数、数组不定参数、 name属性、块级作用域、 元属性、箭头函数、这些函数的新特性需要牢牢掌握。
```
## 19# ES6 扩展对象
```
## 扩展对象的功能性

对象类别：

普通对象：具有javascript 对象所有的默认内部行为。

特异对象：具有某些与默认行为不符的内部行为。

标准对象：es6中定义的对象，如 Array、Date等。

内建对象：脚本开始执行时存在于js执行环境中的对象，所有的标准对象都是内建对象。

### 对象字面量语法的扩展

在es6中 当一个对象的属性和本地变量同名时，不必再写冒号和值，简单地只写属性名即可。当对象字面量里只有一个属性的名称时，js引擎会在可访问的作用域中查找其同名变量。

```
function createPerson(name,age) {
  return {
    name:name,
    age:age
  }
}

function createPerson1(name,age) {
  return {
    name,
    age
  }
}

console.log(createPerson('k',30));
console.log(createPerson1('k1',31));
```

### 对象方法的简写语法

消除了冒号和function关键字

```
var person = {
   name:"Nika",
   say:function(){
     return this.name;
   }
}

var person1 = {
   name:"Nika1",
   say() {
     return this.name;
   }
}

console.log(person.say())
console.log(person1.say());
```

### 可计算属性名

属性名提前已知或可被字符串字面量表示的情况。可以用 person["name"] 表示，然而属性名称“name” 被包含在一个变量中，或者需要通过计算才能得到该变量的值，es5无法定义，但是es6可以。[lastName]:"zakas1"

```
var suffix = "name";
var lastName = "last name";

var person = {
  ["first" + suffix]: "Nika",
  ["last" + suffix]: "Zakas",
  [lastName]: "Zakas1"
}

console.log(person[lastName]);

console.log(person["first" + suffix]);
console.log(person["last" + suffix]);

console.log(person["firstname"]);
console.log(person["lastname"]);
```

### 新增方法

Object. is() 弥补全等运算符不准确的运算。

```
console.log(+0 === -0); // true
console.log(Object.is(+0,-0)); // false

console.log(NaN === NaN); // false
console.log(Object.is(NaN,NaN)); // true

console.log(Object.is(5,"5")); // false
```

Object.assign() 方法

混合Mixin 实现对象组合最流行的一种模式。指一个对象接收来自另一个对象的属性和方法。函数遍历supplier的自有属性并复制到receiver中，复制行为为浅复制，当属性值为对象时只复制对象的引用。

该方法可以接受任意数量的源对象，并按指定的顺序将属性复制到接收的对象中，后覆盖前。

特点：Object.assign() 方法不能将提供者的访问器属性复制到接收对象中。由于该方法执行的赋值操作，提供者的访问器属性最终会转变为接收对象中的一个数据属性。

```
function mixin(receiver,supplier) {
  Object.keys(supplier).forEach(function(key){
    receiver[key] = supplier[key];
  });
  return receiver;
}

var receiver = {};

Object.assign(receiver, 
  {
    type:"js",
    name:"file.js"
  },
  {
    type:"css"
  }
);

console.log(receiver.type); // css
console.log(receiver.name); // file.js


var receiver = {};
var supplier = {
   get name() {
     return "files.11";
   }
}

Object.assign(receiver,supplier);

var des = Object.getOwnPropertyDescriptor(receiver,"name");

console.log(des.value); // files.11
console.log(des.name); // undefined;

```

### 重复的对象字面量属性

在es6下，在对象字面量中重复定义的属性不在报错，直接选取最后的一个值。

### 自有属性枚举顺序

自有属性枚举顺序的基本规则是：1 所有数字键按升序排序。2 所有字符串键按加入对象的顺序排列。3 所有symbol键按被加入对象的顺序排序。

### 增强对象原型

#### 改变对象的原型

es5中创建对象后，其原型是在对象被创建时指定的。对象原型在实例化之后保持不变。在es6中添加了setPrototypeOf方法来改变这一现状，可以改变任意制定对象的原型。传入参数（被修改的原型对象，替换第一个参数原型的对象）

```
let person = {
   getGreeting:function(){
     return "Hello";
   }
}

let dog = {
  getGreeting() {
    return "Woolf";
  }
}

// 以person对象为原型
let friend = Object.create(person);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === person);

// 将原型设置为dog
Object.setPrototypeOf(friend,dog);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === dog);
```

#### 简化原型访问的super引用

如果你想要重写对象实例的方法，又需要调用与它同名的原型方法。super 必须在简写方法中使用。


```
let person = {
   getGreeting(){
     return "Hello";
   }
}

let dog = {
  getGreeting() {
    return "Woolf";
  }
}

let friend = {
  getGreeting(){
     // return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
      return super.getGreeting() + ", hi!";  //  必须在简写方法中使用super引用，否则会报错
  }
}

// 将原型设置为person
Object.setPrototypeOf(friend,person);
console.log(friend.getGreeting()); // Hello
console.log(Object.getPrototypeOf(friend) === person); // true

// 将原型设置为dog
Object.setPrototypeOf(friend,dog);
console.log(friend.getGreeting()); // Woolf
console.log(Object.getPrototypeOf(friend) === dog); // true


// 多重继承 无论多少继承 super 都指向person.get-greeting()方法
let relative = Object.create(friend);

console.log(person.getGreeting()); // “Hello”
console.log(friend.getGreeting()); // "Woolf hi!"
console.log(relative.getGreeting()); // "Woolf hi!"
```

### 正式的方法定义

它会有一个内部的[[HomeObject]]属性来容纳这个方法从属的对象。

```
let person = {
  // 方法
  getGreeting() {
    return "hello";
  }
}

// 以person对象为原型
let friend = {
  getGreeting() {
    return super.getGreeting() + ",hi";
  }
}

Object.setPrototypeOf(friend,person);

console.log(friend.getGreeting());
```

## 小结
```
## 对象很重要，新增了简化属性定义语法、添加可计算属性的定义、省略function和冒号的方法定义、重复属性的校验、assign() 一次性更改对象中的多个属性、Object. is() 严格等价判断、Object.setPrototypeOf方法修改原型，super关键字调用改变作用域this的值。

20# es6 解构
```
## 解构：使数据访问更便捷
解构是一种打破数据解构，将其拆分为更小部分的过程。

### 对象解构
对象字面量的语法形式是在一个赋值操作符左边放置一个对象字面量。如果用解构声明变量，则必须提供初始化程序,因为代码块不允许出现在赋值语句的左侧，用小括号包含转换成表达式。

```
let node = {
   type:"idn",
   name:"foo"
}

let {type,name,value = true} = node;

// ({type,name} = node);

console.log(type); // idn
console.log(name); // foo
console.log(value); // true、undefined
```

### 为非同名局部变量赋值

```
let node = {
   type:"idn",
   name:"foo"
},
    type = "Lital",
    name = "32";


let {type:localT,name:localN} = node;
let {type:localT,name:localN = "bar"} = node; 

console.log(localT); // idn
console.log(localN); // foo / bar
```
### 嵌套对象解构

```
let node = {
   type:"idn",
   name:"foo",
   loc: {
     start: {
       line:1,
       column:2
     },
     end: {
       line:1,
       column:4
     }
   }
};

let {loc:{ start }} = node;

let {loc:{ start:localStart }} = node;

console.log(start.line); // 1
console.log(start.column); // 2

console.log(localStart.line); // 1
console.log(localStart.column); // 2
```
### 数组解构

使用数组字面量,必须提供初始化程序。


```
let colors = ["red","yellow","green"];

let [first,second] = colors;
let [,,third] = colors;

console.log(first);
console.log(second);
console.log(third);

// 交换
let a = 1;
let b = 2;

[a,b] = [b,a];

console.log(b);
console.log(a);
```

### 嵌套数组解构

在原有的数组模式中插入另一个数组模式，也可以深入解构数组

### 不定参数解构

在数组中，可以通过...语法将数组中的其余元素赋值给一个特定的变量

```
let colors = ["red","green","blue"];
let [first,...rest] = colors;

console.log(first);
console.log(rest[0]);
```

数组复制

```
let two = colors.concat(); // es5
let [...three] = colors; // es6
console.log(three);
```

### 混合解构

对象解构和数组解构的混合体

```javascript
let node = {
    type:"Iden",
    name:"foo",
    loc: {
      start: {
        line:1,
        column:2
      },
      end: {
        line:2,
        column:4
      }
    },
    range:[0,3]
}

let {
  loc:{start},
  range:[startIndex]
} = node;

console.log(start.line); // 1
console.log(start.column); // 2
console.log(startIndex); // 0
```

在构造参数传参时，options 可以使用解构函数进行传入，如果解构赋值表达式的右值为null 或 undefined,则程序会报错。希望解构定义的参数为可选的，那么就必须为其提供默认值来解决。

```
const setCookieDefaluts = {
  secure:false,
  path:"/",
  domain:"",
  expires: new Date(Date.now() + 360000000)
}

function setCookie(name,value, {secure,path,domain,expires} = setCookieDefaluts){
   // 设置cookie的代码
}

setCookie("type","js",{
  secure:true,
  expires:60000
});
```
## 小结
```
## 在对象和数组解构中，赋值表达式右值不可为null 或 undefined,否则程序会报错。

21# Symbol
```
## Symbol 和 Symbol 属性

早期的es5中提供了5种原始数据类型：字符串、数字型、布尔型、null 和 undefined。但在es6中，引入了第6种数据类型Symbol，用它来创建对象的私有成员。
可以通过Symbol 为属性添加非字符串的名称。Symbol 函数接收一个可选参数，用于描述创建的Symbol对象。

```
let firstName = Symbol("first name");
let person = {
  [firstName]:"Nicholas"
};

// 将属性设置为只读
Object.defineProperty(person,firstName,{ writable:false });

let lastName = Symbol("last name");

Object.defineProperties(person, {
  [lastName]: {
    value:"Zakas",
    writable:false
  }
});

console.log(person[firstName]);

console.log(person[lastName]);

```

## Symbol 共享体系

我们可能希望在不同的代码中共享同一个Symbol,es6中提供了一个可以随时访问的全局Symbol注册表。for方法在全局Symbol中检索键值为uid的对象是否存在，如果存在直接返回对象。不存在，就创建一个新的Symbol，也返回这个新创建的对象。

```
let uid = Symbol.for("uid");
let object = {};

object[uid] = "12345";

console.log(object[uid]);  // 12345
console.log(uid); // Symbod(uid)

let uid2 = Symbol.for("uid");
console.log(uid2 === uid); // true

console.log(Symbol.keyFor(uid)); // 检索Symbol 有关的键
```

## Symbol 与类型的强制转换

Symbol 无法与字符串拼接和数字运算前进行自动类型转换，它的值与非空值类似，等价于true。

```
let uid = Symbol.for("uid");
let desc = String(uid);
console.log(desc); // "Symbol(uid)"
```
## 属性检索

Object.keys() 方法 和 Object.getOwnPropertyNames() 方法可以检索对象中所有的属性名，一个方法返回所有可枚举的属性名，后一个方法不考虑属性的可枚举性一律返回。但是对于Symbol 只有一个Object.getOwnPropertySymbols(object);

## 内部方法

```
// jsArray
function isArray(value){
  return Object.prototype.toString.call(value) === "[Object Array]";
}
```

```
Symbol.hasInstance : 一个在执行instanceof 时调用的内部方法，用于检测对象的继承信息。

Symbol.isConcatSpreadable : 一个布尔值

Symbol.iterator : 返回一个迭代器

Symbol.match : 用于比较字符串

Symbol.replace : 用于替换字符串的子串

Symbol.search : 用于字符串中定位子串

Symbol.split : 用于分割字符串

Symbol.toStringTag : 用于创建对象描述
```
## ```

## 小结

Symbol 是javascript 中一个新的原始类型，用于创建必须通过Symbol才能引用的属性。这些属性非常适用于那些需要一定程序保护的功能。

22# Set 集合
```
## Set集合与Map集合

Set集合是一种无重复元素的列表，一般不会逐一读取数组中的元素，通常用于检查给定的值在某个集合中是否存在。
Map集合内含多组键值对，集合中的每个元素分别存放着可访问的键名和它对应的值，通常用于缓存频繁取用的数据。

## ES5中模拟Set集合和Map集合

模拟的集合中所有的对象的属性名必须是字符串类型，必须确保每个键名都是字符串类型且在对象中是唯一的。
```
var set = Object.create(null);

set.foo = true;
if(set.foo){

}

var map = Object.create(null);

key1 = {};
key2 = {};
map[key1] = "key1";

map[5] = "foo";
console.log(map["5"]); // foo
console.log(map[5]); // foo
console.log(map[key2]); // "key1" [object object] == [object object]
```

为了屏蔽掉 map.count = 1 if(map.count) 执行的模棱两可性，引入了Set集合和Map集合

## Set集合

一种有序的列表，含有相互独立的非重复值，通过Set集合可以快速访问其中的数据，有效的追踪各种离散值。

set集合中的key不会被强制转换成字符串，因而是两个独立的元素。

```
let set = new Set();
set.add(5);
set.add("5");
set.add(5);
set.delete(5); // 移除元素
set.clear(); // 清空集合
console.log(set.has(5)); // true
console.log(set.size); // 2

```

forEach()方法回调函数包含参数：下一次索引的位置、与第一个参数一样的值、被遍历的集合本身。

```
let set = new Set([1,2,3,4]);
set.forEach(function(value,key,owner){
  console.log(key + " " + value); // 1 1
  console.log(owner === set); // true
});

let set = new Set([1,2,3,4]);
let processer = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    // dataSet.forEach(value => this.output(value));
    dataSet.forEach(function(value){
      this.output(value);
    },this);
  }
}

processer.process(set);
```

### Set集合转换数组

强引用Set集合：转换过程中会自动过滤掉重复的元素，可以用来创建一个无重复元素的新数组。

```
let set = new Set([1,2,3,3,4]);
let arr = [...set];
console.log(arr);
```
### Weak Set集合

弱引用Set集合：只存储对象值的弱引用，并且不可以存储原始类型的值；当key = null 时候会被回收并释放相应的内存。

weakSet构造函数不接受任何原始类型，只接受对象或数组类型，如果数组类型中包含非对象值，会抛出错误。

不可迭代、不暴露任何迭代器、不支持forEach方法、不支持size属性，只有add() delete() has() 三个方法、传入非对象参数会报错。

## Map集合

一种存储许多键值对的有序列表，键名和键值支持所有的数据类型，键名等价判断通过object.is() 方法，所以，5和“5” 表示不同的键名。

map的构造函数传入一个数组来初始化一个集合，在数组中包含子数组，子数组的为[key,value]

```
let map = new Map();
let key1 = {};
map.set("title","Escript");
map.set("year",2016);
map.set(key1,5);

console.log(map.get("title")); //Escript
console.log(map.get(key1)); // 5

console.log(map.size); // 3
console.log(map.has("year")); // true
console.log(map.get("year")); // 2016
map.delete(key1); // 删除键
map.clear(); // 清空

let mm = new Map([["name","Nicho"],["age",25]]);
mm.forEach(function(value,key,owner){
  console.log(key + " " + value); // 
  console.log(owner === mm); // true
})

```

### Weak Map集合

弱引用Map集合:键名必须是一个对象，集合中保存的是这些对象的弱引用，垃圾回收机制会自动回收这个对象，同时也会移除集合中的键值对。（只有键名遵从这个规则）

最大的用途是保存web页面中的Dom元素，是一种存储许多键值对的无序列表，列表的键名必须非null。

不支持size属性 、forEach()方法、clear()方法

如果是只用对象作为集合的键名，WeakMap 最好，如果只想用非对象作为键名，Map最好。

```
let key1 = {};
let key2 = {};
let map = new WeakMap([[key1,"hello"],[key2,"world"]]);

console.log(map.has(key1)); // true
console.log(map.get(key1)); // hello

let Person = (function(){

  let privateData = new WeakMap();

  function Person(name) {
    privateData.set(this,{name:name});
  }

  Person.prototype.getName = function(){
    return privateData.get(this).name;
  }

  return Person;
})();
```
## ```

## 小结

Set集合非重复值的无序列表，可以用它过略数组。WeakSet集合，只支持存放对象的弱引用，便于内存垃圾回收。Map无序键值对组合的集合。WeakMap集合，只支持对象类型的键名，便于内存垃圾回收。

23# 迭代器
```
## 迭代器

它是一种特殊对象，它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个next() 方法，每次调用都返回一个结果对象。结果对象有两个属性：value和done(布尔值)，当没有更多可返回数据时返回true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，没调用一次next方法，都会返回下一个可用的值。

```
// es5中的循环机制

function createIterator(items) {
  var i = 0;
  
  return {
    next: function(){
      
      var done = (i>= items.length);
      var value = !done? items[i++] : undefined;
      
      return {
        done:done,
        value:value
      };
    }
  }
}

var iterator = createIterator([1,2,3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

## 生成器

生成器是一种返回迭代器的函数，通过function关键字后的星号(*)来表示，函数中会有新的关键字 yield。星号可以紧挨着function关键字，也可以在中间添加一个空格。每当执行完一条yield语句后函数就会自动停止执行。

yield 关键字只可以在生成器内部使用，在其他地方使用会导致程序抛出语法错误。即便在生成器内部的函数里使用也是如此。它不能穿透函数边界。

```
function *createIterator(items){
  for(let i=0;i<items.length;i++){
    yield items[i];
  }
}

let iterator = createIterator([1,2,3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```
## 生成器函数表达式

也可以通过函数表达式来创建生成器，只需在function关键字和小括号中添加一个*即可。不能用箭头函数来创建生成器。


```
let createIterator = function*(items){
  for(let i=0;i<items.length;i++){
    yield items[i];
  }
}

let iterator = createIterator([1,2,3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

## 生成器对象的方法

```
let o = {
    *createIterator(items){
      for(let i=0;i<items.length;i++){
        yield items[i];
      }
    }
}

let iterator = o.createIterator([1,2,3]);

console.log(iterator.next().value);
console.log(iterator.next());
console.log(iterator.next());
```
### for-of 循环

```
let values = [1,3,4];

for(let num of values) {
  console.log(num);
}

let iterator = values[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```
## 内建迭代器

在ES6中有3种类型的集合对象：数组、Map集合与Set集合。为了更好的访问对象中的内容，有三种迭代器：entries()、values()、keys() 

entries() 迭代器都会返回一个数组，数组中的两个元素分别表示集合中每个元素的键与值。

keys() 迭代器会返回集合中存在的每一个键名。

values() 迭代器会返回集合中存在的每一个键值。

```
let colors = ["red","green","blue"];
let tracking = new Set([1234,5678,9012]);
let data = new Map();

data.set("title","Understanding ECM6");
data.set("format","ebook");

for(let entry of colors.entries()) {
  console.log(entry); // [0, "red"] [1, "green"] [2, "blue"]
}
for(let entry of tracking.entries()) {
  console.log(entry); // [1234, 1234]
}

for(let entry of data.entries()) {
  console.log(entry); // ["title", "Understanding ECM6"]
}

for(let value of data.keys()) {
  console.log(value); // "title"
}

// 简化写法
for(let value of colors) {
  console.log(value); // "red"
}

for(let num of tracking) {
  console.log(num); // 1234 5678 9012
}

for(let entry of data) {
  console.log(entry); // ["title", "Understanding ECM6"]
}
```

## 字符串迭代器

支持 unicode 编码解析 统计字符串信息

```
let message = "A 空 B";

for(let c of message) {
  console.log(c);
}
```

## NodeList迭代器

```
let divs = document.getElementsByTagName("div");

for(let div of divs) {
  console.log(div.id);
}

let se = new Set([[1,2,3,4,5],["Nicholas"]]);
let arr = [...se];

console.log(arr)  // [[1, 2, 3, 4, 5], ["Nicholas"]]

let s1 = [1,2,3];
let s100 = [100,101,102];
let all = [0,...s1,...s100];

console.log(all); // [0, 1, 2, 3, 100, 101, 102]
```

## 高级迭代器

第一次调用next方法时候，传入什么参数都会被丢弃。因为第一次调用next方法不会执行任何yeild语句，也就是说没有任何值可以返回，在第二次调用的时候，传入参数，执行第二个yeild语句，返回第二次的值为6等待序列第三次调用。
```
function *createIterator() {
  let first = yield 1; // (1)
  let second = yield first + 2; // (2) 4 + 2
  yield second + 3; // 5 + 3; // (3) 
}

let iterator = createIterator();

console.log(iterator.next());
console.log(iterator.next(4)); 4 + 2 => 6
console.log(iterator.next(5));
console.log(iterator.next());
```
抛出错误：模拟结束函数执行的两种手段，返回值和抛出错误。

通过return 语句指定的返回值，只会在返回对象中出现一次，在后续调用返回的对象中，value属性会是undefined。

```
function *createIterator() {
  yield 1;
  return 42;
  yield 2;
  yield 3;
}

let iterator = createIterator();

console.log(iterator.next()); // 1
console.log(iterator.next()); // 42
console.log(iterator.next()); // undefined;
```

### 委托生成器

在某些情况下，我们需要将两个迭代器合二为一，这时可以创建一个生成器，在给yield语句添加一个星号，就可以将生成数据的过程委托给其他生成器。


```
function *c1(){
   yield 1;
   yield 2;
 }
 
 function *c2(){
   yield "red";
   yield "green";
 }

 function *call(){
   yield *c1();
   yield *c2();
   yield true;
 }

 var cs = call();

console.log(cs.next());
console.log(cs.next());
console.log(cs.next());
console.log(cs.next());
console.log(cs.next());
console.log(cs.next());
```

## 异步执行任务

```
function run(taskDef) {
  // 创建一个迭代器
  let task = taskDef();
  
  // 开始执行任务
  let result = task.next();
  
  // 循环调用next()
  function step() {
    if(!result.done) {
      if(typeof result.value === "function"){
         result.value(function(err,data){
           if(err) {
             result = task.throw(err);
             return;
           }
           
           result = task.next(data);
           step();
         });
      }else{
        result = task.next(result.value);
        step();
      }
    }
  }
  
  // 开始迭代执行
  step();
  
}

run(function*(){
   let value = yield 1;
   console.log(value); // 1
  
   value = yield value + 3;
   console.log(value); // 4

   let contents = yield readFile("config.json");
   doSome(content);
   console.log("Done");
  
});
```
## ```

## 总结

迭代器是ES6中的一个重要组成部分，它是语言中某些关键语言的依赖。Symbol.iterator 被用来定义对象的默认迭代器。for-of用来获取迭代器的值。生成器是一种特殊的函数，在定义的时候需要加入(*)号，被调用的时候会自动创建一个迭代器，并通过yield来标识每次调用的迭代器的next() 方法时的返回值。


24# 类
```
## javascript中的类
### es5中的近类结构
思路：创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型。
```
function PersonType(name) {
  this.name = name;
}

PersonType.prototype.sayName = function(){
  console.log(this.name);
}

var person = new PersonType("Nicholas");
person.sayName();

console.log(person instanceof PersonType); // true
console.log(person instanceof Object); // true
```
### 类的声明

- 函数声明可以被提升，类声明不能被提升，真正执行声明语句之前，他们会一直存在于临时死区内。
- 类声明自动运行在严格模式下
- 类中的所有方法都是不可枚举的
- 每个类都有一个名为[Construct]的内部方法
- 在类中修改类名会导致程序错误

```
class PersonClass {
   // 等价于PersonType构造函数
   constructor(name) {
     this.name = name;
   }

   // 等价于PersonType.prototype.sayName
   sayName(){
     console.log(this.name);
   }
   tell(){
     console.log(this.name);
   }
}

let person = new PersonClass("Nicholas");
person.sayName(); // "Nicholas"
person.tell(); // "Nicholas"

console.log(person instanceof PersonClass); // true
console.log(person instanceof Object);// true

console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"
```

### 类表达式

类和函数都有两种存在形式：声明形式和表达式形式。

类声明和类表达式的不同是 name 属性，匿名类表达式的 name 属性值是一个空字符串，而类声明的 name 属性值 为类名

```
let PersonClass = class {

  // 等价于PersonType构造函数
  constructor(name) {
    this.name = name;
  }

  // 等价于PersonType.prototype.sayName
  sayName() {
    console.log(this.name);
  }
}

let person = new PersonClass("Nicholas");
person.sayName(); // Nicholas

console.log(person instanceof PersonClass); // true
console.log(person instanceof Object);// true

console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"
```

### 命名类表达式

PersonClass2 中只存在于类的定义中，在类的外部不存在一个名为PersonClass2的绑定，所以，typeof PersonClass2 为undefined

```
let PersonClass = class PersonClass2{
  // 等价于PersonType构造函数
  constructor(name) {
    this.name = name;
  }

  // 等价于PersonType.prototype.sayName
  sayName() {
    console.log(this.name);
  }
}
```

### 一等公民类 箭头函数

指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值。

```
let person = new class {

  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}("Nicholas");

person.sayName();
```

### 访问器属性

在原型上定义访问器的属性，通过setter 和 getter 方法将这个元素的innerHTML 方法委托给html属性。

```
class CustomHTMLElement {

  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,"html")

console.log("get" in descriptor); // true
console.log("set" in descriptor); // true
```

### 可计算成员名称

```
let methodName = "sayName";

class PersonClass {

  constructor(name) {
    this.name = name;
  }

  [methodName]() {
    console.log(this.name);
  }
}

let me = new PersonClass("Nicholas");
me.sayName(); // Nicholas
```
### 生成器方法
### 静态成员

如果有static关键字的方法 为静态成员方法，不可在实例中访问静态成员，必须要直接在类中访问静态成员。

```
function PersonType(name) {
  this.name = name;
}

// 静态方法
PersonType.create = function(name){
  return new PersonType(name);
}

// 实例方法
PersonType.prototype.sayName = function(){
  console.log(this.name);
}

var person = PersonType.create("Nicholas");

person.sayName(); // "Nicholas"
```

### 继承与派生类

继承自其它类的类被称为派生类，如果在派生类指定了构造函数则必须要调用super方法。

super使用方法：只可在派生类 (用extends声明的类) 的构造函数中使用super、在构造函数中访问this之前一定要调用super(),它负责初始化this。如果不想调用super(),则唯一的方法是让类的构造函数返回一个对象。

类方法遮蔽、静态成员继承

Es5中的继承实现：

```
function Reactangle(length,width) {
  this.length = length;
  this.width = width;
}

Reactangle.prototype.getArea = function(){
  return this.length * this.width;
}

function Square(length) {
  Reactangle.call(this,length,length);
}

Square.prototype = Object.create(Reactangle.prototype,{
  constructor: {
    value:Square,
    enumerable:true,
    writeable:true,
    configurable:true
  }
});

var square = new Square(3);

console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Reactangle); // true
```

ES6中的等价实现：

```
class Reactangle {
   constructor(length,width) {
     this.length = length;
     this.width = width;
   }

   getArea() {
      return this.length * this.width;
   }

   // 静态成员
   static create(length,width) {
     return new Reactangle(length,width);
   }
}

class Square extends Reactangle {
  constructor(length) {
    // 等价于 Reactangle.call(this,length,length)
    super(length,length);
  }

  // 覆盖遮蔽后调用Reactangle.prototype.getArea()  类方法遮蔽
  getArea() {
    return super.getArea();
  }

}

var square = new Square(3);

console.log(square.getArea()); // 9
console.log(square instanceof Square); // true

// 静态成员继承

var rct = Square.create(3,5);
console.log(rct instanceof Reactangle); // true
console.log(rct.getArea()); // 15
console.log(rct instanceof Square); // false
```

## 派生自表达式类

只要表达式可以被解析为一个函数并且具有[constrctor]属性和原型，就可以用extends进行派生。

```
function Reactangle(length,width) {
  this.length = length;
  this.width = width;
}

Reactangle.prototype.getArea = function(){
  return this.length * this.width;
}

function getBase(){
  return Reactangle;
}

class Square extends getBase() {
  constructor(length) {
    // 等价于 Reactangle.call(this,length,length)
    super(length,length);
  }
}

var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x instanceof Reactangle); // true
```

## 内建对象继承

es5中的内置继承方式：this的值开始指向的是MyArr实例，但是随后会被来自Array的其他属性所修饰。

es6中的内置继承方式：this的值开始指向的是Array，然后派生类MyArr的构造函数在修改这个值。

## Symbol.species属性

它被用于定义返回函数的静态访问器的属性。被返回的函数是一个构造函数，每当要在实例方法中创建类时必须使用这个构造函数。

## 小结
```
## es6 中类的继承 通过 super() 方法继承。


25# 数组增强
```
## 改进的数组功能

es5中 创建数组有两种方式，一种是调用Array构造函数、另一种是用数组字面量语法

```
let items = new Array(2);
console.log(items.length);// 2 
console.log(items);// undefined

items = new Array("2");
console.log(items); //2
```

在es6中引入 Array.of() 方法来解决 构造函数中传入的值混乱的问题 （2 或 "2"），只需传入你希望在数组中包含的值。

```
let items = Array.of(1,2);
console.log(items.length); // 2
console.log(items[0]); // 1
console.log(items[1]); //2
```
js中不支持直接的非数组对象转换成真实数组，arguments 就是一种类数组对象。es6中可以通过Array.from() 方法转换实现。

```
function makeArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
function doSomething(){
//   var args = makeArray(arguments);
  var args = Array.from(arguments);
  console.log(args);
}
doSomething(1,2,2,3,4,5);
```
### 映射转换

```
// 映射1
function translate(){
  return Array.from(arguments,(value) => value + 1);
}

let numbers = translate(1,2,3);
console.log(numbers); // 2,3,4

// 映射2
let helper = {
  diff:1,
  add(value) {
    return value + this.diff;
  }
}
function translate(){
  return Array.from(arguments,helper.add,helper);
}
let numbers = translate(1,2,3);
console.log(numbers); // 2,3,4
```

### 位所有数组添加新方法

find() 和 findIndex() 方法 查找第一个符合规则的元素 接收两个参数：回调函数和可选参数。find返回查找到的值、findIndex返回查找到的值的索引。

```
let numbers = [22,33,44,55,10];
console.log(numbers.find(n =>n>40)); // 44
console.log(numbers.findIndex(n =>n>40)); // 2
```

fill() 方法可以用制定的值填充一至多个数组元素。

```
let numbers = [1,2,3,4];
numbers.fill(2);
console.log(numbers.toString()); // "2,2,2,2,2"
numbers.copyWithin(2,0);
console.log(numbers.toString()); // 1,2,1,2
```

## 定型数组

就是将任何数字转换为一个包含数字比特的数组，然后通过js数组方法来进一步处理。

### 数组缓冲

```
let buffer = new ArrayBuffer(10);
let buffer2 = buffer.slice(4,6);
console.log(buffer.byteLength); // 10
console.log(buffer2.byteLength); // 2

// 视图操作数组缓冲
let view = new DataView(buffer,5,2); //buffer index length
console.log(view.byteLength); //5
```
相似之处：定型数组和普通数组都有length,通过数值型索引可以直接访问定型数组的元素。

不同之处：定型数组的length属性是一个不可写的属性，所以不能通过修改length改变大小,定型数组不继承自Array.可以通过Array.isArray() 检查定型数组返回false。

### 常用方法

copyWithin()  findeIndex() slice() entries() forEach() map() some() fill() indexOf() reduce() sort() filter() join() values() find() keys() reverse()

定型数组中缺少的方法 concat() shift() pop() push() splice() push() unshift()

定型数组中独特的方法 set() subarray()
```
let ints = new Int16Array([25,50]);
let mapped = ints.map(v => v * 2);
console.log(mapped[1]); // 100

let intsArray = [...ints];
console.log(intsArray[0]); // 25

ints.set([25,75]); // 复制内容到定型数组
ints.set([125,175]);
console.log(ints.toString());// "125,175"

let sub = ints.subarray(); // 创建一个新数组，截取内容到新的数组中
console.log(sub.toString());// "125,175"
```

## 小结
```
##  新增创建数组的两个方法 Array.of() Array.from()

26# promise异步编程
```
## promise 与 异步编程

javascript 是基于单线程的，如果想实现多个任务，需要任务队列来实现。

事件模型：点击按钮触发事件队列，异步代码会在未来的某个时间点执行

回调模式：被调用的函数是作为参数传入的。弊端：嵌套回调

promise: 相当于异步操作结果的占位符，不会触发一个事件，也不会传入回调函数给目标函数，而是返回一个Promise。

### 生命周期

先是处于进行中pending状态，此时操作尚未完成，所以它是为处理的；一旦异步操作执行结束，它变成已处理settled状态。

3种状态 pending fulfilled(异步操作成功完成) rejected(出现错误未能成功完成)

所有的promise 都有 then(fulfilled,rejected) 方法,fulfilled 函数 成功都执行它，rejected 函数 失败都执行它。

如果实现了then() 方法的对象，这个对象可以称为thenable对象。所有的promise都是thenable对象，但是并非所有thenable对象都是promise.


```
let fs = require("fs");
function readFile(filename) {
  return new Promise(function(resolve,reject){
     fs.readFile(filename,function(err,data){
       if(err){
         reject(err); // 失败
         return;
       }
       
       resolve(data); // 成功
     });
  });
}
let promise = readFile(".txt");
promise.then(function(contents){
  // 完成
  console.log(contents);
},function(err){
  // 拒绝
  console.error(err.message);
});

// 异常处理
promise.catch(function(err){
  console.log(err.message);
});
```

### 创建未完成的promise

最好的方式是使用Promise的构造函数，由于执行具有动态性。

利用new Promise创建构造函数，该构造函数只有一个参数：包含初始化Promise代码的执行器函数。该执行器函数有两个构造参数。resolve() 成功执行 和 reject() 失败执行。 完成处理程序和拒绝处理程序总是在执行器完成后被添加到任务队列的末尾。

### 创建已完成的promise

```
let promise = Promise.resolve(42);
// 成功状态
promise.then(function(value){
  console.log(value); // 42
});

// 失败状态
promise.catch(function(value){
  console.log(value); // 42
})
```

### 非promise的thenable对象

```
let thenable = {
  then:function(resolve,reject){
    resolve(42);
  }
}
let p1 = Promise.resolve(thenable);
p1.then(function(value){
  console.log(value); // 42
});
```

### 串联Promise

```
let p1 = new Promise(function(resolve,reject){
  resolve(52);
});

p1.then(function(value){
  console.log(value); // 52
}).then(function(){
  console.log("Finished"); // Finished
});
```
### Promise链的返回值

```
let p1 = new Promise(function(resolve,reject){
  resolve(52);
});

p1.then(function(value){
  console.log(value);
  return value + 1; // 52
}).then(function(value){
  console.log(value); // 53
});
```
### 在Promise链中返回Promise

实际上retun p2，把p2添加到p3中，而非调用p2

```
let p1 = new Promise(function(resolve,reject){
  resolve(52);
});
let p2 = new Promise(function(resolve,reject){
  resolve(53);
});
p1.then(function(value){
  console.log(value); // 52
  return p2; 
}).catch(function(value){
  console.log(value); // 53
});
```

### 响应多个promise

通过Promise.all() 和 Promise.race() 两个方法来监听多个Promise。

Promise.all() 只接受一个参数数组并返回一个promise,该参数是一个包含多个受监听Promise可迭代对象，执行多次。

Promise.all() 只接受一个参数数组并返回一个promise,该参数是一个包含多个受监听Promise可迭代对象，进行竞选，以决出哪个先被执行，只执行一次。

```
let p1 = new Promise(function(resolve,reject){
  resolve(52);
});
let p2 = new Promise(function(resolve,reject){
  resolve(53); // reject(53) 只要一个被拒绝，那么就停止执行。
});
let p3= new Promise(function(resolve,reject){
  resolve(54);
});

let p4 = Promise.all([p1,p2,p3]);
// let p4 = Promise.race([p1,p2,p3]); // 只执行52 
p4.then(function(values){
  console.log(values); // 52 53 54
});
```

### 自Promise继承

yield 实现异步代码的生成器，而且不会暴露回调函数，未来用async + await代替yield来调用函数。

```
class MyPromise extends Promise {
  success(resolve,reject){
    return this.then(resolve,reject);
  }

  failure(reject){
    return this.catch(reject);
  }
}

// yield 调用
co(function*{ 
    let data = yield readFile(".json");
});

// async调用
(async function(){
   let data = await readFile(".json");

});

```
## 小结
```
## Promise的目的是改进js中的异步编程，更好的掌控并组合多个同步操作，比事件系统和回调更实用。


27# 代理和反射
```
## 代理和反射

代理是一种可以拦截并改变底层javascript引擎操作的包装器，可以创建内建对象。

```
let target = {};
let proxy = new Proxy(target,{});

proxy.name = "john";
console.log(proxy.name); // john
console.log(target.name); // john
```

### 使用set验证属性

```
let target = {
  name:"target"
};
let proxy = new Proxy(target,{
  set(trapTarget,key,value,receiver) {
    
    if(!trapTarget.hasOwnProperty(key)){
       if(isNaN(value)) {
         throw new TypeError("属性必须是数字");
       }
    }
    // 添加属性
    return Reflect.set(trapTarget,key,value,receiver);
  }
});

proxy.count = 1;
console.log(proxy.count);
console.log(target.count);
```

### 使用get陷阱验证对象结构

return Reflect.get(trapTarget,key,receiver);

### 使用has陷阱隐藏已有属性

return Reflect.has(trapTarget,key);

### 使用deleteProperty陷阱防止删除属性

Object.defineProperty(target,"name",{ configurable:false });

return Reflect.deleteProperty(trapTarget,key);

### 不用new调用构造函数

```
function Numbers(...values) {

  if(typeof new.target === "undefined"){
    throw new TypeError("该函数必须通过new调用");
  }

  this.values = values;
}


let NumbersProxy = new Proxy(Numbers,{
  apply:function(trapTarget,thisArg,argumentsList){
    return Reflect.construct(trapTarget,argumentsList);
  }
});

//let instance = new Numbers(1,2,3,4);

let instance = new NumbersProxy(1,2,3,4);
console.log(instance.values); // [1, 2, 3, 4]

// Numbers(2,3,4,5,6); // 报错
```
## ```

## 小结

代理用来解决开发者无法复制某些对象表现出来的行为。通过Reflect对象 添加代理映射。revoke() 函数禁用特殊代理对象。


28# 模块化
```
## 用模块封装代码

模块是自动运行在严格模式下并且没有办法退出的javascript代码。存在作用域的概念，需要导出变量或函数。模块的this的值是undefined;其次，模块不支持html风格的代码注释；

### 导出的基本语法

```
// 导出数据
export var color = "red";
// 导出函数
export function sum(num1,num2) {
  return;  
}
// 导出类
export class Rect {
    constructor(length,width){
        this.length = length;
    }
}
// 导出模块私有的
export sum;
```
### 导入的基本语法

通过 import 导入包含：要导入的标识符和标识符应当从哪个模块导入。

```
import {sum, multiply} from './example.js';
import * as example from './example.js';

console.log(sum(1,2));
console.log(example.sum(1,2));
```

#### 导入绑定的诡异之处

标识符只有在被导出的模块中可以修改，导入后的文件中不可以在修改覆盖同一个变量的值。

导出和导入的时候可以给标识 重命名 通过 as 方法

```
import {add as sum} from "./example.js";
// sum 为 as 关键字来指定函数在模块外应该被称为的名称。
```

default 为每个模块设置一个默认的导出值，导出时多次使用default关键字是一个语法错误。

```
export default sum;
export {sum as default};
import sum,{color} from "./example.js" // 导入color 和 默认函数，默认值必须排在非默认值之前
import {default as sum,color} from "./example.js" // 导入
```

修改全局作用域中的对象，内建共享对象可以不导出 exports 直接 import 引用即可。

当type = "module" 时候支持网页端加载模块，使脚本按照模块方式加载而非script加载方式。

导入模块 必须以以下几种方式开头

- / 从根目录开始
- ./ 从当前目录开始
- ../ 从父目录开始
```
- http://

## 小结

导入导出脚本



```