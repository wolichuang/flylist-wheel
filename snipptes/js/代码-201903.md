# 代码块整理

## 是什么

收集 整理一些代码块，强化记忆

## 手写 柯里化
```
Function.prototype.curry = function(){
		var fn = this,
			args = Array.prototype.slice.call(arguments);
		return function(){
			return fn.apply(this,args.concat(
				Array.prototype.slice.call(arguments)));
		}
}
```
## 手写 webpack 配置
```
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.resolve(__dirname,'./app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';

// 打包地址
const buildPath = path.resolve(__dirname, './dist');
// 模板地址
const templateRoot = dirApp;

// 删除 dist
let emptyDir = function (fileUrl) {
  let files = fs.readdirSync(fileUrl); //读取该文件夹
  files.forEach(function (file) {
      let stats = fs.statSync(fileUrl + '/' + file);
      if (stats.isDirectory()) {
          emptyDir(fileUrl + '/' + file);
      } else {
          fs.unlinkSync(fileUrl + '/' + file);
          console.log("删除文件 " + fileUrl + ' ````' + file + "```` 成功");
      }
  });
};

// 页面入口
const pageEntry = {};
// 页面模板
const pageHtml = [];
// 检查是否有打包目录
!fs.existsSync(buildPath) && fs.mkdirSync(buildPath);
if(!IS_DEV) {
   emptyDir(buildPath); 
}
// 读取文件目录
const pages = fs.readdirSync(templateRoot);
/**
 * Webpack Configuration
 */
pages.forEach((name, index) => {
  // 页面入口配置
  // const enterPath = path.join(templateRoot, name);
  // 所有页面 一个 index.js  可以改成 多个页面多个 js
  // pageEntry[name] = path.join(dirApp, 'index')
  // 输出页面模板
  // pageHtml.push(new HtmlWebpackPlugin({
  //   filename: `${name}`,
  //   hash: true,
  //   template: path.join(__dirname, 'template/' + `${name}`)
  // }))
  if(name.indexOf(".html")>-1) {
    pageHtml.push(new HtmlWebpackPlugin({
        filename: `${name}`,
        title: `${name}`,
        inject: 'head',
        hash: true,
        template: path.join(__dirname, 'app/' + `${name}`)
    }));
  }
});


/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        vendor: [
            'lodash'
        ],
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/css/wxStyle.css'
        })
    ].concat(pageHtml),
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    // 'style-loader',
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
// dev.js
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        host: '0.0.0.0'
    }

});
// build.js
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        host: '0.0.0.0'
```
    }

});


## 手写 二分查找法？
```
<script type="text/javascript">
function TwoSearch(array, value, left, right) {
  if (left > right) return -1;
  var middlePivot = Math.floor((left + right) / 2);
  if (array[middlePivot] === value) {
    return middlePivot;
  } else if (array[middlePivot] > value) {
    return TwoSearch(array, value, left, middlePivot - 1);
  } else {
    return TwoSearch(array, value, middlePivot + 1, right);
  }
}
var array = [1, 2, 3, 5, 9, 8];

console.log(TwoSearch(array,8,0,array.length-1));
```
</script>


## 判断回文函数？
```
// 判断某个字符串是否为回文字符串，譬如racecar与race car都是回文字符串：
function isPa(word){
	var letter = word.toLowerCase().replace(/\s/g,"");
	var reletter = letter.split("").reverse().join("");
	return letter == reletter;
}
console.log("是否是回文",isPa("racecar")); // true
```
console.log("是否是回文",isPa("race Car")); // true


## 判断大括号是否闭合？
```
// 创建一个函数来判断给定的表达式中的大括号是否闭合：
var expression = "{{}}{}{}"
var expressionFalse = "{}{{}";

function isBalanced(expression){
  var checkstr = expression;
  var stack = [];
  var len = checkstr.length;
  if (len <= 0) return true;
  for (var i = 0; i < len; i++) {
  	if(checkstr[i] === '{') {
       stack.push(checkstr[i]);
     } else if (checkstr[i] === '}') {
       // Pop on an empty array is undefined
       if (stack.length > 0) {
         stack.pop();
       } else {
         return false;
       }
     }
  };
  if (stack.pop()) return false;
  return true;
}
console.log(isBalanced(expressionFalse));
```

## 算法 数组交集
```
var firstArray = [2, 2, 4, 1];
var secondArray = [1, 2, 0, 2];
function sameArr(firstArray,secondArray){
	var temp = [];
	var hashMap = {};
	firstArray.forEach(function(i){
		hashMap[i] = 1;
	});
	secondArray.forEach(function(i){
		if(hashMap[i] === 1){
			temp.push(i);
			hashMap[i]++;
		}
	});
	return temp;
}
console.log(sameArr(firstArray,secondArray));
```

## 手写 数组去重？
```
var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
console.log("es6写法",Array.from(new Set(array)));
/*利用对象的键不能重复的特性 数组去从复*/
function unique(array){
	var hashMap = {};
	var unique = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
		if(!hashMap.hasOwnProperty(array[i])){
			hashMap[array[i]] = 1;
			unique.push(array[i]);
		}
	};
	return unique;
}
console.log("es5写法",unique(array));
```

## 手写 常用 dom 操作？
```
//插入
var para=document.createElement("p");
var node=document.createTextNode("This is new.");
para.appendChild(node);
var element=document.getElementById("div1");
element.appendChild(para);
//添加
var para=document.createElement("p");
var node=document.createTextNode("This is new.");
para.appendChild(node);
var element=document.getElementById("div1");
var child=document.getElementById("p1");
element.insertBefore(para,child);
//删除
var parent=document.getElementById("div1");
var child=document.getElementById("p1");
parent.removeChild(child);
//替换
var para=document.createElement("p");
var node=document.createTextNode("This is new.");
para.appendChild(node);
var parent=document.getElementById("div1");
var child=document.getElementById("p1");
```
parent.replaceChild(para,child);


## 手写 函数节流？
```
<input id="search" type="text" name="search"/>
<script>
    function queryData(text){
        console.log("搜索：" + text);
    }
    var input = document.getElementById("search");
    input.addEventListener("keyup", function(event){
        throttle(queryData, null, 500, this.value,1000);
        // throttle(queryData, null, 500, this.value);
        // queryData(this.value);
    });
    
    function throttle(fn,context,delay,text,mustApplyTime){
        clearTimeout(fn.timer);
        fn._cur=Date.now();  //记录当前时间
        if(!fn._start){      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
            fn._start=fn._cur;
        }
        if(fn._cur-fn._start>mustApplyTime){ 
        //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
            fn.call(context,text);
            fn._start=fn._cur;
        }else{
            fn.timer=setTimeout(function(){
                fn.call(context,text);
            },delay);
        }
    }
</script>
```
## 手写 元素是否包含指定的 class ?
```
// 简化版
function hasClass(element,cls){
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
// 兼容性写法
var hasClassfix = (function(){
  var div = document.createElement("div");
  if("classList"  in div && typeof div.classList.contains === "function"){
  	return function(elem,className){
  		return elem.classList.contains(className);
  	}
  }else{
  	return function(elem,className){
  		var classes = elem.className.split(/\s+/) ;
             for(var i= 0 ; i < classes.length ; i ++) {
                 if( classes[i] === className ) {
                     return true ;
                 }
             }
             return false ;
  	}
  }
})();
var test = document.querySelector(".test");
	console.log(hasClassfix(test,"wx-nojs-one"));
```
## 手写 判断汉字的个数？
```
var str = "从前山上有个小和尚 long long ago, a person on the mountain,he is a male";
function chinese_size(str){
  var arr = [];
  str.replace(/[\u4e00-\u9fa5]/gm,function(){
  	var text = arguments[0];
  	var index = arguments[arguments.length - 2];
         arr.push({
            text: text,
            index: index
         });
         return text;
  });
  return arr.length;
}
console.log(chinese_size(str));
```
## 手写 日期格式化函数？
```
//yyyy-MM-dd
var getDateFormat = function(options){
    options = options || {};
    options.sign = options.sign || 'yyyy-MM-dd HH:mm:ss';
    var _complete = function(n){
        return (n>9) ? n : '0' + n;
    }
    
    var d = new Date();
    var year = d.getFullYear();
    var month = _complete(d.getMonth()+1);
    var day =  _complete(d.getDate());
    var hours =  _complete(d.getHours());
    var minutes =  _complete(d.getMinutes());
    var second =  _complete(d.getSeconds());
  
    var result = options.sign;
    result = result.replace('yyyy', year);
    result = result.replace('MM', month);
    result = result.replace('dd', day);
    result = result.replace('HH', hours);
    result = result.replace('mm', minutes);
    result = result.replace('ss', second);
    return result;
}
console.log(getDateFormat());
```
## 手写 数字转换二进制字符串？
```
function ToBinary(digit){
	if(digit >= 1) {
	    // If digit is not divisible by 2 then recursively return proceeding
	    // binary of the digit minus 1, 1 is added for the leftover 1 digit
	    if (digit % 2) {
	      return ToBinary((digit - 1) / 2) + 1;
	    } else {
	      // Recursively return proceeding binary digits
	      return ToBinary(digit / 2) + 0;
	    }
	  } else {
	    // Exit condition
	    return '';
	  }
}
```
console.log(ToBinary(3)); // 11


## css3 - 基础 属性
```
/*水平阴影位置 垂直阴影位置 模糊距离  阴影尺寸 阴影颜色*/
.shadow{box-shadow:10px 10px 5px 5px #ccc;}
.border{border:15px solid transparent;-webkit-border-image:url(../images/star.gif) 30 30 stretch;-o-border-image:url(../images/star.gif) 30 30 stretch;border-image:url(../images/star.gif) 30 30 stretch;}
/*水平阴影位置 垂直阴影位置 模糊距离  阴影颜色*/
.border span{text-shadow: 5px 5px 5px #ccc;} 
/*移动 translate*/
.translate{transform:translate(120px,20px);-ms-transform:translate(120px,20px);-webkit-transform:translate(120px,20px);}
/*旋转 rotate*/
.rotate{transform:rotate(30deg);-ms-transform:rotate(30deg);-webkit-transform:rotate(30deg);}
.rotateX{transform:rotateX(120deg);-ms-transform:rotateX(120deg);-webkit-transform:rotateX(120deg);}
.rotateY{transform:rotateY(120deg);-ms-transform:rotateY(120deg);-webkit-transform:rotateY(120deg);}
/*缩放 scale*/
.scale{transform: scale(2,2);-webkit-transform:scale(2,2);-ms-transform:scale(2,2);}
/*倾斜 skew*/
.skew{transform:skew(30deg,20deg);-ms-transform:skew(30deg,20deg);-webkit-transform:skew(30deg,20deg);}
/*混合矩阵 matrix 旋转，缩放，移动（平移）和倾斜*/
.matrix{transform:matrix(0.866,0.5,-0.5,0.866,0,0);-ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0);-webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0);}
/*运动 transition 名称 持续时间 时间曲线函数 延迟多久*/
.width{width:100px;height:100px;background:#f90;transition:width 2s,height 2s;-webkit-transition:width 2s,height 2s;-ms-transition:width 2s,height 2s;}
.width:hover{width:300px;height:200px;transform:rotate(180deg);-webkit-transform:rotate(180deg);}
/*动画 animation 名称 持续时间 时间曲线函数 延迟多久 播放次数(infinite) 是否在下一周期逆向地播放 否正在运行或暂停*/
.myfirst{animation:myfirst 5s;-webkit-animation:myfirst 5s;}
@keyframes myfirst
{
0%   {background:red; left:0px; top:0px;}
25%  {background:yellow; left:200px; top:0px;}
50%  {background:blue; left:200px; top:200px;}
75%  {background:green; left:0px; top:200px;}
100% {background:red; left:0px; top:0px;}
}
@-webkit-keyframes myfirst
{
0%   {background:red; left:0px; top:0px;}
25%  {background:yellow; left:200px; top:0px;}
50%  {background:blue; left:200px; top:200px;}
75%  {background:green; left:0px; top:200px;}
100% {background:red; left:0px; top:0px;}
}
```

## 闭包理解题？
```
var test = (function(a) {
    this.a = a; 
    var that = this;
    return function(b) {
        return this.a + b;
    }
}(function(a, b) {
    return a;
}(1, 2)));
// console.log(a);//输出什么？？？？
console.log("输出5",test(4)); //输出什么？？？？ 

var test2 = function(a){
	return (function(a){
		return a + 3;
	}(a));
}
console.error("输出7",test2(4));

 var test3 = function(a) {
    this.a = a; 
    return (function(a,b) {
        return this.a + b;
    }(a,(function(a, b) {
    	return a;
	})(1, 2)));
}
console.log("输出5",test3(4)); //输出什么？？？？
console.info("输出4",a);
```

## 算法-斐波那契？
```
 function facitial(n){
    //跳出的条件
    if(n<=1){
        return 1;
    }
    //内部修改函数的值
    else{
        return n*arguments.callee(n-1);
    }
}
console.log("斐波那契函数",facitial(5));
```
## 算法-取最多出现的字母和出现了几次？
```
 //取最大出现的个数
var str = "abcdaa";
var max = 0;
var max_str='';
var result = {};
for (var i = str.length - 1; i >= 0; i--) {
    var c = str.charAt(i);
    //alert(c); 取得全部的数据
    if(result[c]){
        result[c]++;
        if(result[c]>max){
            max_str = c;
            max = result[c];
        }else if(result[c]==max){
            max_str+=" "+c;
        }

    }else{
        result[c]=1;//注入数据
    }
};
```
console.log("取字符串最多出现的字母是什么个数",max+":"+max_str);


## 算法-找出整型数组中乘积最大的三个数？
```
var arr = [-10, 7, 29, 30, 5, -10, -70];
	/**
	 * [maxArray description]
	 * 1 排序正序
	 * 2 负负为正验算
	 * 3 创建两个变量 2分查找法
	 * 4 算出 除去后3位，从倒数第四位开始的3个数的乘机
	 * 5 算出 前两位 和 最后一位的乘机
	 * @return {[type]} [description]
	 */
	function sortMax(a,b){
		return a - b;
	}
	function compute(arr){
		var sorted = arr.sort(sortMax);
		var len = sorted.length-1;
		var p1 = 1;
		var p2 = 1;
		for (var x = len; x > len - 3; x--) {
		      p1 = p1 * sorted[x];
		}
		p2 = sorted[0] * sorted[1] * sorted[len];
		if(p1>p2){
			return p1;
		}else{
			return p2;
		}
	}
```
	console.log(compute(arr));


## 手写 发布订阅
```
//发布订阅(自定义事件)
class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        (this.subs[event] || (this.subs[event] = [])).push(cb)
    }

    // 也可以使用 call 指定 context
    trigger(event, ...args) {
        this.subs[event] && this.subs[event].forEach(cb => {
            cb(...args)
        })
    }

    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event,cb)
    }

    off(event, offCb) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex(cb => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }
}

let dep = new EventEmitter()

let cb = function () {
    console.log('handleClick')
}

let cb2 = function () {
    console.log('handleMouseover')
}

dep.on('click', cb)
dep.on('click',cb2) 
dep.trigger('click') // handleClick

dep.off('click', cb)
dep.trigger('click') // handleMouseover

dep.once('mouseover', cb2)
dep.trigger('mouseover') // handleMouseover
```
## dep.trigger('mouseover') //  handleMouseover

创建定长数组？
```
let array = Array(5).fill('');
console.log(array); // 输出（5）["", "", "", "", ""]
// 数组去重复
Array.from(new Set(cars));
[...new Set(cars)];
// 对象合并
{ ...product, ...manufacturer };
// 将对象数组合并成一个对象
const result = cities.reduce((accumulator, item) => {
  return {
    ...accumulator,
    [item.name]: item.visited
  }
}, {});
// 数组映射
const cityNames = Array.from(cities, ({ name}) => name);
console.log(cityNames);
// 动态设置属性名
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
console.log(user); // 输出 { name: "John", email: "john@doe.com" }
//字符串插值
${user.name}
 
```
## 手写 模板函数
```
function TemplateEngine(template,data) {
   var re = /<%([^%>]+)?%>/g,
      reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, //用于匹配语句标识
      code = "var r=[];\n",
      cursor = 0,
      match;
  var add = function(line,js) {
    js
     ? (code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n")
     : (code += line !="" ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : "");
    return add;
  }
  while ((match = re.exec(template))) {
    add(template.slice(cursor,match.index))(match[1],true);
    cursor = match.index + match[0].length;
  }
  add(template.substr(cursor,template.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g,"")).apply(data);
}

var template =
  "<div>" +
  "<p>Name<span><% this.name %></span></p>" +
  "<p>Gender<span>" +
  "<% if(this.gender === 'male') { %>" +
  "Male" +
  "<% } else { %> " +
  "Female" +
  "<% } %>" +
  "</span></p>" +
  "</div>";

var data = {
  name: "AJie",
  gender: "male"
};
console.log(TemplateEngine(template, data));
```
## 算法排序
```
## 直接插入
	 基本思想：在要排序的一组数，假设前面（n-1）[n>=2]个数已经是排好顺序的，先要把第n个数插入到前面的有序数，使得这n个数也是排好顺序的。如此反复循环，知道全部排好顺序。
## 希尔排序
	基本思想：算法先将要排序的一组数按某个增量d（n/2，n为要排序的个数）分成若干组，每组中记录的下标相差d。对每组中全部元素进行直接插入排序，然后再用一个较小的增量（d/2）对它进行分组，在每组中再进行直接插入排序。当增量减到1时，进行直接插入排序后，排序完成。
## 简单选择排序
    基本思想：在要排序的一组数中，选出最小的一个数与第一个位置的数交换，然后剩下的数当中找出最小的与第二个位置的数交换，如此寻哈un到倒数第二个数和最后一个数为止。
## 堆排序
	基本思想：堆排序是一种树形选择排序，是对直接选择排序的有效改进。
    具有n个元素的序列（h1,h2,...,hn),当且仅当满足（hi>=h2i,hi>=2i+1）或（hi<=h2i,hi<=2i+1）(i=1,2,...,n/2)时称之为堆。在这里只讨论满足前者条件的堆。由堆的定义可以看出，堆顶元素（即第一个元素）必为最大项（大顶堆）。完全二叉树可以很直观地表示堆的结构。堆顶为根，其它为左子树、右子树。初始时把要排序的数的序列看作是一棵顺序存储的二叉树，调整它们的存储序，使之成为一个堆，这时堆的根节点的数最大。然后将根节点与堆的最后一个节点交换。然后对前面(n-1)个数重新调整使之成为堆。依此类推，直到只有两个节点的堆，并对它们作交换，最后得到有n个节点的有序序列。从算法描述来看，堆排序需要两个过程，一是建立堆，二是堆顶与堆的最后一个元素交换位置。所以堆排序有两个函数组成。一是建堆的渗透函数，二是反复调用渗透函数实现排序的函数。
## 冒泡排序
    基本思想：在要排序的一组数中，对当前还未排好序的范围内的全部数，自上而下对相邻的两个数依次进行比较和调整，让较大的数往下沉，较小的往上冒。即：每当两相邻的数比较后发现它们的排序与排序要求相反时，就将它们互换。
## 快速排序
    基本思想：选择一个基准元素,通常选择第一个元素或者最后一个元素,通过一趟扫描，将待排序列分成两部分,一部分比基准元素小,一部分大于等于基准元素,此时基准元素在其排好序后的正确位置,然后再用同样的方法递归地排序划分的两部分。
## 归并排序
基本排序：归并（Merge）排序法是将两个（或两个以上）有序表合并成一个新的有序表，即把待排序序列分为若干个子序列，每个子序列是有序的。然后再把有序子序列合并为整体有序序列。
## 基数排序
```
基本思想：将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后,数列就变成一个有序序列。



## mock.js
```
# mock.js 模拟接口
npm install mockjs --save 
const Mock = require('mockjs');
var Random = Mock.Random;
Random.extend({
    uuid: function() {
        return Math.random().toString(36).substr(2);
    }
})
module.exports = {
    'status': 'ok',
    'results|25': [{
        'id|+1': 10,
        'posts': "@cparagraph(1)",
        'ctime': "@date('yyyy-MM-dd')",
        'title': '@ctitle(1,20)',
        'thumbnail': {
            'small': {
                url: "@image(321x210,@color())"
            },
            'large': {
                url: "@image(640x420,@color())"
            }
        }
    }]
}
Random.time( format? )返回一个随机的时间字符串 
Random.datetime( format? )返回一个随机的日期和时间字符串 
Random.image( size?, background?, foreground?, format?, text? )
Random.now( unit?, format? )返回当前的日期和时间字符串 
Random.ctitle( min?, max? )随机生成一句中文标题 
Random.cname()随机生成一个常见的中文姓名 
Random.url( protocol?, host? )随机生成一个 URL 
Random.email( domain? )随机生成一个邮件地址
Random.city( prefix? )随机生成一个（中国）市 
Random.guid()随机生成一个 GUID 
Random.id()随机生成一个 18 位身份证
"@uuid()"
```
## httpServer
```
## 快速启动一个http服务
//导入HTTP模块
let http = require('http'); 
//定义一个要监听的端口
const PORT=8989; 
// 一个处理请求和发送响应的函数
const handleRequest = (request, response) => {
    response.end('Hello World!!!');
}
// 创建服务器
let server = http.createServer(handleRequest);
// 启动服务
server.listen(PORT, () => {
    console.log("Server listening on: http://localhost:%s", PORT);
});
## Express启动一个静态服务
var express = require('express')
var app = express()
app.use(express.static('docs')) // 代理的文件夹（自动找文件夹下的index.html为 /级目录内容）
app.listen(3000, () 
=> console.log('Example app listening on port 3000!'))
```

## 文件操作
```
## 读写文件
// 异步读取
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
// 异步写入
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log('写入成功')
});
// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());
// 同步写入
fs.writeFileSync('input.txt', '我是通 过fs.writeFile 写入文件的内容')
```

## 正则判断字符串包含
```
# 字符串包含
console.log(string.indexOf(sub)>-1); // true
console.log(string.indexOf(nosub)>-1); // false
console.log(string.search(/fo/)>-1);// true
console.log(string.search(/osr/)>-1); // false
console.log(/fo/.test(string)); // true
console.log(/osr/.test(string)); // false
console.log(string.match(/fo/)[0]!=="") // true
console.log(!!string.match(/osr/)) // false
console.log(string.includes(sub)) // true
console.log(string.includes(nosub)) // false
```

## 正则表达式
```
# 正则表达式
1. 小括号就是括号内看成一个整体 ,中括号就是匹配括号内的其中一个
2. 如果要匹配特定几组字符串的话，那就必须使用小括号()加或|
3. parttern.test(string)
// 手机号
console.log(/^1[34578]\d{9}$/.test(phone)) 
// 身份证正则合并
(^\d{15}$)|(^\d{17}([0-9]|X)$)
var reg_num = /(\d+)/g; // 匹配数字
var reg_space =/(^\s*)|(\s*$)/g; // 过滤前后空格
var reg_html = /()/g; // 过滤html标签
var reg_pwd = /^[a-zA-Z0-9]+$/g; //由数字和26个英文字母组成的字符串
var reg_email = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g;//email地址
var reg_url = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/g; // 链接
console.log(str.match(reg_num));
console.log(str.replace(reg_space,''));
console.log(str.match(reg_pwd));
console.log(email.match(reg_email));
console.log(url.match(reg_url));
var z = "您好 hello";
/* 中文字符串长度 */
String.prototype.len=function(){
	return this.replace(/[^x00-xff]/g,"aa").length;
}
console.log(z.len())
```

## once 函数
```
# once函数
function once(fn, context) { 
    var result;
    return function() { 
    ​    if(fn) {
    ​        result = fn.apply(context || this, arguments);
    ​        fn = null;
    ​    }
        return result;
    };
};
```
## jquery ajax
```
## jquery ajax
$.ajax({
    type:'GET',
    url:'http://127.0.0.1:9999',
    data:{name:'wxh'},
    dataType:'jsonp',
    timeout:300,
    context:$('body'),
    success:function(data){
    	$("#sd_demo").text(data.name)
	},
	error:function(xhr,type){
		console.log('Ajax error!');
	}
});
## jquery extend 函数
var options =$.extend({},
{name:"Tom",age:21},{name:"Jerry",sex:"Boy"});
for(i in options) {
    console.log(options[i])
}
// 就是将hello方法合并到jquery的全局对象中。
$.fn.extend({
    hello:function(){
        console.log('$.fn.hello');
    }
});
$.fn.hello();
// 就是将hello方法合并到jquery的实例对象中。
$.extend({
    hello:function(){
        console.log('$.hello');
    }
});
$.hello()
```


​		

