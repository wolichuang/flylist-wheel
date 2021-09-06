# 代码块整理

## 是什么

收集 整理一些代码块，强化记忆

## 01# py 操作

```
## is 和 ==
== 运算符是比较两个对象的内容是否相等，默认情况是调用对象的__eq__方法进行比较；
而is是比较两个对象是否一样，它比较的两个对象的id，即它们的内存地址是否相同。
a = [1,2,3]
b = [1,2,3]
print(a is b) #False
区间[-5,256]的整数，它们在创建时，无论创建多少个对象，它们的id是一样的，即它们在底层中只保存一份内存。
a = -6
b = -6
print(id(a), id(b)) # id 不同
print(a is b) # False  
## 日期函数
import datetime;
today = datetime.date.today();
print(today) #2019-07-09
print(str(today))
print(repr(today)) #datetime.date(2019, 7, 9)

## 浅拷贝
浅拷贝，因为没有把子对象进行拷贝，只是拷贝了指向子对象的引用，所以，修改 父对象中的多层元素的时候，子对象的值也做了修改。
arr = [1,2,3];
cp = list(arr);
print(cp)

## 深拷贝
import copy
a = [[1,2,3],[4,6],'w']
b = copy.deepcopy(a)
a[0][1] = 1000
print(b) #[[1,2,3],[4,6],'w']
```
## 02# py 实现继承
```
## 实现继承
class Base:
    def foo(self,name):
        print(name)
    def age(self,age):
        print(age)

class Person(Base):
    def foo(self):
        print('hello')

pp = Person();
pp.foo(); # hello
pp.age(31); #31

## nametuple
对 tuple 类型的二次封装
from collections import namedtuple
Point = namedtuple('Point','x y z')
p = Point(1,3,4)
print(p.x) #1
### 转化为dict 
p._asdict() 
### 更新或替换某个属性值
p._replace(x=111) 
### 使用_make创建新对象 
Point._make([333,666,999]) # Point(x=333, y=666, z=999)
```
## 03# py 类变量和实例变量
```
## 类变量和实例变量
1. 类变量是属于类的，它存储在“类的内存空间”里，并能够被它的各个实例对象共享。而实例变量是属于某个特定实例的，它不在“类的内存空间”中，它是独立于各个实例存在的。
2. 如果对类变量进行，那么其它实例也会同步修改。而对某个实例对修改，并不会影响都类变量。
## 实例方法、类方法和静态方法
class MyClass:
    def method(self):
        print(f"instance method at {self}" )
    @classmethod
    def classmethod(self,cls):
        print(f'classmethod at {cls}')
    @staticmethod
    def staticmethod():
        print('staticmethod')

mc = MyClass()
print(mc.method()) 
print(mc.classmethod(1))
print(mc.staticmethod())
1. 首先在前面可以看到类方法和静态方法的对象是不一样的，一个是bound method，一个是function。
2.其次类方法可以访问到类对象MyClass，而静态方法不能。
```
## 3.最后静态方法其实跟一个普通的function对象一样，只不过它是属于类命名空间的。

04# 实现 拖拽
```
## 实现拖拽
window.onload = function () {
  // drag处于绝对定位状态
  let drag = document.getElementById('box')
  drag.onmousedown = function(e) {
    var e = e || window.event
    // 鼠标与拖拽元素边界的距离 = 鼠标与可视区边界的距离 - 拖拽元素与边界的距离
    let diffX = e.clientX - drag.offsetLeft
    let diffY = e.clientY - drag.offsetTop
    drag.onmousemove = function (e) {
      // 拖拽元素移动的距离 = 鼠标与可视区边界的距离 - 鼠标与拖拽元素边界的距离
      let left = e.clientX - diffX
      let top = e.clientY - diffY
      // 避免拖拽出可视区
      if (left < 0) {
        left = 0
      } else if (left > window.innerWidth - drag.offsetWidth) {
        left = window.innerWidth - drag.offsetWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > window.innerHeight - drag.offsetHeight) {
        top = window.innerHeight - drag.offsetHeight
      }
      drag.style.left = left + 'px'
      drag.style.top = top + 'px'
    }
    drag.onmouseup = function (e) {
      this.onmousemove = null
      this.onmouseup = null
    }
  }
```
## }


05# 节流
```
## 实现一个节流函数
function throttle (fn, delay) {
  // 利用闭包保存时间
  let prev = Date.now()
  return function () {
    let context = this
    let arg = arguments
    let now = Date.now()
    if (now - prev >= delay) {
      fn.apply(context, arg)
      prev = Date.now()
    }
  }
}

function fn () {
  console.log('节流')
}
```
## addEventListener('scroll', throttle(fn, 1000)) 


06# 防抖
```
## 实现一个防抖函数
function debounce (fn, delay) {
  // 利用闭包保存定时器
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, arg)
    }, delay)
  }
}

function fn () {
  console.log('防抖')
}
```
addEventListener('scroll', debounce(fn, 1000)) 


## 07# vue 动态属性名
```
## vue 动态属性名
<!-- 属性name -->
<a :[name]="url"> ... </a>
<!-- 计算属性sss和s -->
<img :[str]="/img/test.png"/>  
<!-- 方法change1和change2 -->
<img :[change1()]="change2()"/>
data: {
    name: 'href',
    str: 'src'
}
```
## 08# jquery 原理
```
## jquery 原理
(function(window, undefined) {
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  }
  jQuery.fn = jQuery.prototype = {
    version: '0.0.1',
    constructor: jQuery,
    length: 0,
    selector: '',
    init: function(selector, context) {
      var match, elem;
      if (!selector) {
        return this;
      }
      elem = document.querySelectorAll(selector);
      for (var i = 0,
      len = elem.length; i < len; i++) {
        this[i] = elem[i];
      }
      this.context = document;
      this.length = elem.length;
      this.selector = selector;
      this.html = ele.innerHTML;
      return this;
    }
  }
  jQuery.fn.init.prototype = jQuery.fn;
  window.$ = jQuery;
})(window)
console.log($("#ele").html)
```
## 09# 敏感词过滤
```
## 敏感词过滤
var ma = "大xx".split('');
 var regstr = ma.join('([^\u4e00-\u9fa5]*?)');
 var str = "这是一篇文章,需要过滤掉大xx这三个词,大xx中间出汉字以外的字符 大_/_傻a1v逼和 大傻a1v逼";
 var reg = new RegExp(regstr , 'g');
 console.log(str.replace(reg,"<替换的词>"));
```
## 10# sleep 函数
```
## sleep 函数
function sleep(interval) {
   return new Promise(resolve => {
     setTimeout(resolve, interval);
   })
 }
 async function test() {
   for (let index = 0; index < 10; index++) {
     console.log(index);
     await sleep(2000)
   }
```
 }

 test()


## 11# iso 键盘弹出
```
## ios 键盘弹出
// 监听键盘收起及弹出状态
document.body.addEventListener('focusout', () => {
  if (isIphone()) {
    setTimeout(() => {
      document.body.scrollTop = document.body.scrollHeight
    }, 100)
  }
})

document.body.addEventListener('focusin', () => {
  if (isIphone()) {
    setTimeout(() => {
      document.body.scrollTop = document.body.scrollHeight
    }, 100)
  }
```
})


## 12# 实现-工具类
```
## js 封装jquery 库
(function(window) {
	var Ts1 = function() {}

	var wxUtil = Ts1;

	// id
	wxUtil.prototype.getId = function(id) {
		return document.getElementById(id);
	}

	// classId
	wxUtil.prototype.getClass = function(cls) {
		return document.getElementsByClassName(cls)
	}

	// 选择器
	wxUtil.prototype.getTagName = function(selector) {
		return document.querySelectorAll(selector);
	}

	// 属性查询
	wxUtil.prototype.getAttrName = function(attr) {
		return document.querySelectorAll(attr);
	}

	//上一个元素
	wxUtil.prototype.getPrev = function(elem) {
		return elem.previousElementSibling;
	}

	//下一个元素
	wxUtil.prototype.getNext = function(elem) {
		return elem.nextElementSibling;
	}

	// 兄弟元素
	wxUtil.prototype.getSiblings = function(elem) {
		return Array.prototype.filter.call(elem.parentNode.children,(child) => {
			return child!==elem;
		})
	}

	// 获取属性
	wxUtil.prototype.getAttr = function(ele,attr) {
		return ele.getAttribute(attr);
	}

	// 设置属性
	wxUtil.prototype.setAttr = function(ele,key,value) {
		ele.setAttribute(key,value);
		return true;
	}
	
	// 获取input#val
	wxUtil.prototype.getValue = function(id) {
		return document.querySelector(id).value;
	}


	window.Ts = wxUtil;
```
})(window);


## 13# gulp
```
## gulpfile.js 打包 scss 和 图片
var gulp = require("gulp")
var sass = require("gulp-sass")
var browser = require('browser-sync')
var imagemin = require('gulp-imagemin')
// 自动刷新
var DEV = './src';
var path = {
	sass: DEV + '/assets/sass/wxStyle.scss'
}
// 编译 sass
gulp.task('sass', function(){
	return gulp.src(path.sass).pipe(sass({outputStyle: 'compact'}))
	.on('error', sass.logError).pipe(gulp.dest(DEV +'/assets/css'))
})
// 编译 images
gulp.task('images', function(){
	return gulp.src(DEV + "/assets/images/*.(png,jpg,gif,ico)").pipe(imagemin()).pipe(gulp.dest(DEV +'/img'));
})
// 服务 server
gulp.task('serve', function() {
	browser.init({
		server: DEV + '/'
	});

	gulp.watch(DEV + '/*.html').on('change',browser.reload)
	gulp.watch(DEV + '/assets/js/*.js').on('change',browser.reload)
	gulp.watch(DEV + '/assets/css/*.css').on('change',browser.reload)
});
// 监控
gulp.task('watch', function() {
	gulp.watch(path.sass,['sass']);
});
gulp.task('default',['sass','images','watch','serve'])
```
## 14# gulp package.json
```
{
  "name": "gulp-app",
  "version": "1.0.0",
  "description": "",
  "dependencies": {
    "browser-sync": "^2.11.1"
  },
  "devDependencies": {
    "autoprefixer": "^8.5.1",
    "babel-core": "^6.26.3",
    "babel-preset-es2015": "^6.24.1",
    "del": "^3.0.0",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.1",
    "gulp-clean-css": "^3.9.4",
    "gulp-concat": "^2.6.1",
    "gulp-html-replace": "^1.6.2",
    "gulp-postcss": "^7.0.1",
    "gulp-rev": "^8.1.1",
    "gulp-rev-collector": "^1.3.1",
    "gulp-sass": "^3.2.1",
    "gulp-sync": "^0.1.4",
    "gulp-uglify": "^3.0.0",
    "gulp-imagemin": "^1.1.0",
    "merge-stream": "^1.0.1",
    "node-sass": "^4.8.3",
    "postcss-adaptive": "^0.5.0"
  }
}
```
## 15# css3 关闭
```
// 全局 body
body {
  display:flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f5f4f6;
}
// 关x闭
.icon {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  display: block;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.icon:before {
  -webkit-transform: translate(15px, 10px) rotate(-45deg);
          transform: translate(15px, 10px) rotate(-45deg);
}
.icon:after {
  -webkit-transform: translate(15px, 10px) rotate(45deg);
          transform: translate(15px, 10px) rotate(45deg);
}
// 矩形斜切
.container {
  position:relative;
  background:#fff;
  width:420px;
  height:100px;
  border-radius:12px;
  clip-path: polygon(4% 0px, 100% 0%, 96% 100%, 0px 100%);
  box-shadow: 0 12px 48px -8px rgba(black,.1)
}
```
## 16# 动画 滑块
```
// flex 居中
.bar {
  display:flex;
  align-items:center;
  box-sizing: border-box;
  width:100%;
  height:100%;
  position:absolute;
  left:0;
}
.option {
  cursor:pointer;
  text-align:center;
  width:25%;
}
// 动画 - 滑块
.bar-outer.left .bar-inner {
  transition-delay: 0;
}
.bar-outer.left {
  transition-delay: 80ms;
}
.bar-outer.right .bar-inner {
  transition-delay: 80ms;
}
.bar-outer.right {
  transition-delay: 0;
}
```
## 17# 数组操作
```
const numbers = [1,2,7,2,6,0,3,1,5,7,8,9,45,12,34,0,56,12,2]
// 复制数组
const copy = [...numbers];
// 复制 for 循环（浅复制）
numbersCopy = []; 
for (i = 0; i < numbers.length; i++) {
  numbersCopy[i] = numbers[i];
}
// 复制 while 循环 （浅复制）
numbersCopy = [];
i = -1;
while (++i < numbers.length) {
  numbersCopy[i] = numbers[i];
}
// 复制 Array.map（浅拷贝）
numbersCopy = numbers.map((x) => x); 
// 复制 Array.filter（浅拷贝）
numbersCopy = numbers.filter(() => true); 
// 复制 Array.reduce（浅拷贝）
numbersCopy = numbers.reduce((newArray, element) => {
  newArray.push(element);
  return newArray;
}, []);
// 复制 Array.slice（浅拷贝）
// 根据指定的start、end的index从原数组中返回一个浅拷贝的数组。
numbersCopy = numbers.slice(); 
// 复制 JSON.parse & JSON.stringify（深拷贝）
numbersCopy = JSON.parse(
  JSON.stringify(numbers)
);
// 复制 Array.cancat（浅拷贝）
numbersCopy = numbers.concat([]); 
// 复制 Array.from（浅拷贝）
numbersCopy = Array.from(numbers);
// 1、如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
// 2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；
// 3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；
// 4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
// 5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
var fruits = ["Apple", "Banana","tomato"]; // 创建
var copy_fruits = fruits.slice(); // 复制
var pos = fruits.indexOf("Banana"); // find
fruits.push("orange"); // 追加
fruits[0] = 'mango'; // 修改
var last =fruits.pop(); // 删除最后一个, 返回删除的元素
var first = fruits.shift(); // 删除第一个，返回删除的元素
fruits.unshift("Strawberry"); // 添加第一个，返回数组的长度，改变了原数组
var ns = fruits.splice(pos,1); // 从指定的位置向后移除一个元素
// 遍历数组
fruits.forEach(function(item,index,array){
  console.log(index,item);
});
// 遍历数组
for(var i = fruits.length-1;i >=0 ; i--){
     console.log(fruits[i]);
}
console.log('fruits index===>',fruits['2'] == fruits['02']); // true
console.log("数组下标测试==>",Object.keys(copy_fruits));  // ['0', '1', '2', '5']
```
### slice
**截取数组中的几个元素 组成新的数组**

slice(start,end)表示从下标start开始到下标end（不包括end）进行截取，得到的是一个新数组，不改变原数组。当start为负值时表示从倒数第几个元素开始往后截取，不填end的话就表示从倒数第几个元素开始截取，一直截取到数组末尾元素。

```
const sliceArr = numbers.slice(-5)
console.log('sliceArr ',sliceArr) // 得到[34,0,56,12,2]
```
### splice
splice()方法有三个参数，分别表示从哪个下标开始，删几个元素。可以实现增加，删除，替换数组元素的功能。arr.splice(-5,5)表示从倒数第五个元素开始，删五个元素。巧妙的是该方法的返回值是删除的元素集合。同时该方法改变了原数组。原数组变成了除了删除的元素剩下的元素集合。

```
const spliceArr = arr.splice(-5,5)
console.log('spliceArr',spliceArr) // 得到[34,0,56,12,2]
```
### forEach
```
//标准
forEach(callback[,thisArg])
//简单示例
Array.forEach(function(item, index, array){
    //回调函数内容
}, args);
// 扩展
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            //当thisArg为undefined时，JS引擎会将window作为其调用者
            if (this[i])
                callback.call(thisArg, this[i], i, this);
        }
    }
}
```
### filter
3个参数同forEach，args也同forEach，唯一不同的是，函数有回调函数里有return返回值。

简单来说，该方法返回值是一个数组。

初始时，这个数组是空数组，该方法会通过回调函数遍历整个数组（指Array这个），

假如当前的元素返回值为true（或者可以隐式转换为true的，比如一个长度大于0的字符串），

那么会将当前元素添加到被返回的数组中。

例如：[1, 2, 3]，

回调函数的return是item > 1, 

当第一个元素1时，1>1为false，因此不会添加到返回的数组中，

而2和3 >1显然是true，因此会被添加到数组中。最终，返回值是[2,3]。

```
//标准
filter(callback[,thisArg])
//简单示例
Array.filter(function(item, index, array){
    //回调函数内容
}, args);
// 扩展
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback, thisArg) {
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i]) {
                if (callback.call(thisArg, this[i], i, this)) {
                    //如果callback返回true,则该元素符合过滤条件，将元素压入temp中
                    temp.push(this[i]);
                }
            }
        }
        return temp;
    }
}
```
### map
3个参数同forEach，args也同forEach，唯一不同的是，函数有回调函数里有return返回值。

简单来说，该方法的返回值也是一个数组（类filter）；

**和filter的区别在于，filter是将原数组元素，选择性加入到新数组中。**

**map是将原数组的每个元素，进行处理后，放到新数组中。**

例如：[1,2,3]作为原数组，map回调函数内的代码为：

return item + 10;

那么就相当于将1+10放到数组中，然后将2+10放到数组中，再将3+10放到数组中。

结果为：[11, 12, 13]

当然，也可以写更复杂的逻辑，比如if(item>3)时+10，然后else if(item>2)时+5，否则else -10

那么结果就是[-9, 7, 13]

```
//标准
map(callback[,thisArg])
//简单示例
Array.map(function(item, index, array){
    //回调函数内容
}, args);
// 扩展
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i]) {
                var newItem = callback.call(thisArg, this[i], i, this);
                temp[i] = newItem//将callback返回的新元素压入temp中
            }
        }
        return temp;
    }
}
```
### reduce
首先看回调函数，他有四个参数，

item是当前元素，别的地方写的是currentValue表示当前值，为了方便理解，我这里写item和上面统一风格

index是当前元素的索引；

Array是整个数组（可以通过这个修改源数组）；

上面3个都很好理解。

第一个参数previousValue是核心。他表示上一次执行回调函数时的返回值。

例如，有数组[1, 2, 3, 4]

当我遍历到第二个元素时，回调函数的previousValue的值是1，item的值为2，

return我写为：return previousValue + item

那么当遍历到第三个元素时，回调函数的previousValue的值则为3（因为1+2），item的值为3

当遍历到第四个元素时，previous的值则为6（因为3+3），

最终reduce的返回值为10（因为6+4）

那么问题来了，为什么没提到遍历第一个元素？

原因是，当reduce没有第二个参数时，遍历从数组的第二个元素开始，

第一次执行回调函数的previousValue的值是数组第一个元素的值

当reduce存在第二个参数时（哪怕是null或者undefined），遍历都将从第一个元素开始；

第一次执行回调函数时（遍历第一个元素），previousValue的值是第二个参数的值，而item是第一个元素的值

所以在使用的时候需要注意，如果需要执行和数组元素个数一样次数的回调函数，那么必须设置reduce的第二个参数；

如果不设置，那么回到函数次数执行的次数，将比数组元素个数少1。

```
//标准
reduce(callback[,initialValue])
//简单示例
arr.reduce(function (previousValue, item, index, Array) {
    return xxx;    //xxx表示省略
});
// 扩展
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback, initialValue) {
        var previousValue = initialValue || this[0];//如果不指定intialValue,则默认为数组的第一个元素
        //如果不指定initialValue（即第二个参数），i从1（第二个元素）开始遍历，否则就从0（第一个元素）开始遍历
        for (var i = initialValue ? 0 : 1; i < this.length; i++) {
            //previousValue 累加每一次返回的结果
            if (this[i])
                previousValue = callback(previousValue, this[i], i, this.toString());
        }
        return previousValue;
    }
}
```
### reduceRight
```
//标准
reduceRight(callback[,initialValue])
//简单示例
arr.reduceRight(function (previousValue, item, index, Array) {
    return xxx;    //xxx表示省略
});
// 扩展
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (callback, initialValue) {
        var previousValue = initialValue || this[this.length - 1];//如果不指定intialValue,则默认为数组的第一个元素
        //如果不指定initialValue（即第二个参数），i从1（第二个元素）开始遍历，否则就从0（第一个元素）开始遍历
        for (var i = (initialValue ? this.length - 1 : this.length - 2); i > -1; i--) {
            //previousValue 累加每一次返回的结果
            if (this[i])
                previousValue = callback(previousValue, this[i], i, this);
        }
        return previousValue;
    }
}
```
### every
返回值是true或者false

初始情况下是true；

然后遍历数组，有一个不满足，则为false，并且终止遍历过程。

回调函数的this依然默认指向window，或者是every的第二个参数。

空数组的every返回结果是true。

```
//标准
every(callback, thisArg);
//简单示例
arr.every(function(item, index, array){
    return item > xx;
});
if (!Array.prototype.every) {
    Array.prototype.every = function (callback, thisArg) {
        var result = true;
        for (var i = 0; i < this.length; i++) {
            if (this[i]) {
                if (!callback.call(thisArg ? thisArg : window, this[i], i, this)) {
                    result = false;
                    break;
                }
            }
        }
        return result; //所有元素都符合条件，返回true
    }
}
```
### indexOf
用于查找第一个参数是否在数组中；

如果不在，返回-1；

如果在，返回在数组中遇见的第一个的下标；

例如：[1,2,3,2].indexOf(2)的返回值是1，虽然第二个和第四个元素都是，但是先遇见第二个，而第二个的下标是1

如果indexOf有第二个参数，那么从数组中第二个参数所指向的下标位置开始往后找；

例如：[1,2,3,2].indexOf(2,2)的返回值是3，因为开始下标是2（即第三个元素3），因此从第三个开始，遇见的第一个2的下标是2；

判断时含第二个参数所指向的数组元素

```
//标准
arr.indexOf(searchElement, fromIndex);
//简单示例
[1,2,3].indexOf(2);    //1（数组的第二个元素）
[1,2,3].indexOf(4);    //-1（未找到，注意，-1不是false，隐式转换后他的值为true）
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var result = -1;
        for (var i = fromIndex ? fromIndex : 0; i < this.length; i++) {
            if (this[i]) {
                if (searchElement === this[i]) {
                    result = i;
                    break;
                }
            }
        }
        return result; //所有元素都符合条件，返回true
    }
}
```
### lastIndexOf
```
//标准
arr.lastIndexOf(searchElement, fromIndex);
//简单示例
[1,2,1].lastIndexOf(1);    //2
[1,2,1].lastIndexOf(1, 1);    //0
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
        var result = -1;
        for (var i = (fromIndex ? fromIndex : this.length - 1); i > -1; i--) {
            if (this[i]) {
                if (searchElement === this[i]) {
                    result = i;
                    break;
                }
            }
        }
        return result; //所有元素都符合条件，返回true
    }
}
```
### from()
Array.from() 从类数组对象或者可迭代对象中创建一个新的数组实例。

```
console.log(Array.from([1,2,3],x=>x*x)); // 2,4,9
```
Array.isArray() 用来判断某个变量是否是一个数组对象。

```
console.log(Array.isArray(Array.from([1,2,3]))); // true
```
Array.of() 根据一组参数来创建新的数组实例，支持任意的参数数量和类型。

```
console.log(Array.of(1, 2, 3));// [1,2,3]
```
### **concat()**
连接两个或更多的数组，并返回结果

```
var arr = [ 1, 2, 3 ];
var arr2= arr.concat("4", "5", "6");   //["1", "2", "3", "4", "5", "6"];
```
### **join()**
把数组的所有元素放入一个字符串并通过指定的分隔符进行分隔

```
arr.join("+");   //"1+2+3";
```
### **reverse()**
反转数组中元素的顺序。

```
arr.reverse(); 
console.log(arr);   // [3, 2, 1];
```
### **sort()**
数组排序 按照字符串的方式来排序。

### **toString()**
把数组转换为字符串，并返回结果

### **find()**
返回传入一个测试条件,符合条件的数组第一个元素,当数组中的元素在测试条件时返回true时, find() 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined

```
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
];
var pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```
### some 方法
用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测,如果没有满足条件的元素，则返回false。

```
let arr = [1, 2, 3, 4, 5]
console.log(arr.some(item => item === 2)); // true
// ES5循环实现 some 方法
const selfSome = function (fn, context) {
    let arr = Array.prototype.slice.call(this) // 复制数组原型对象
    // 空数组直接返回 false，数组的 every 方法则相反返回 true
    if(!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i)) continue;
        let res = fn.call(context,arr[i],i,this)
        if(res)return true
    }
    return false
}
// 挂载
Array.prototype.selfSome ||(Object.defineProperty(Array.prototype, 'selfSome', {
    value: selfSome,
    enumerable: false,
    configurable: true,
    writable: true
}))
console.log(arr.selfSome(item => item === 2)) // true
```
### every 方法
用于检测数组所有元素是否都符合指定条件,如果数组中检测到有一个元素不满足，则整个表达式返回false，且剩余的元素不会再进行检测。

```
function whoBig(element, index, array) {
    return (element >= 4);
}
arr.every(whoBig)   //false
```

