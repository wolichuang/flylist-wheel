# 代码块整理

## 是什么

收集 整理一些代码块，强化记忆





## 监控键盘 ESC 事件
$(document).keyup(function(e){
    var code = e.keyCode ? e.keyCode : e.which;
    if(code == 27 || code == 96){
         alert("退出")
    }else if(code == 13) {
        alert("回车")
    }
    });
```



### 点击区域外隐藏弹框

```
function clickHideDoc(src,dest){
   var ele = document.querySelector("#" + src);
   var oDiv = document.querySelector("#" + dest);
   // 点击 元素
   ele.onclick = function(){
       // 显示 弹框
       oDiv.style.display = "block";
   }
   // 监控 body 点击
   document.body.onclick = function(e){
       e = e || window.event;
       var target = e.target || e.srcElement;
       // 判断点击的是否 是按钮 和 弹框层
       if(target.id === dest || target.id === src) return;
       // 隐藏
       oDiv.style.display = "none";
   }
}

```

### radio 美化

```
# 获取 url 的参数
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null) return unescape(r[2]);
    //不存在时返回null
    return null; 
}

# 操作 checkbox
$('input:not(:checked)').attr("disabled","true"); // 反选
$("input").attr("checked")=="checked"; // 是否选中

# radio 美化
<style>
.radio-2{margin:50px auto;padding:3% 0;width:900px;background-color:#eee;text-align:center}
.radio-2 label{position:relative;display:inline-block;overflow:hidden;margin-right:10px;width:28px;height:28px;border:1px solid #eee;border-radius:100%;background-color:#fff;cursor:pointer}
.radio-2 label:after{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background-color:#f90;content:"";transition:transform .2s ease-in;transform:rotate(-180deg);transform-origin:-2px 50%}
.radio-2 [type=radio]{display:none}
.radio-2 [type=radio]:checked+label:after{transition:transform .2s ease-out;transform:rotate(0)}
</style>

<div class="radio-2">
   <input type="radio" name="radio-2" id="radio-2-1" checked="checked">
   <label for="radio-2-1"></label>
  
   <input type="radio" name="radio-2" id="radio-2-2">
   <label for="radio-2-2"></label>
   <input type="radio" name="radio-2" id="radio-2-3">
   <label for="radio-2-3"></label>
</div>
```

### 创建- iframe

```
## 创建 iframe
<iframe src="" width="1100" 
marginwidth="0" marginheight="0" scrolling="no" frameborder="0" 
allowtransparency="true" id="iframeSon"></iframe>
#DOM方法：
#父窗口操作IFRAME：window.frames["iframeSon"].document
#IFRAME操作父窗口: window.parent.document
#jquery方法:
#在父窗口中操作 选中IFRAME中的所有输入框： #$(window.frames["iframeSon"].document).find(".text");
# 在IFRAME中操作 选中父窗口中的所有输入框：# #$(window.parent.document).find(".text");
#$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");
```

### 小写转大写数字

```js
// 手写 小写转大写数字
<input type="text" id="price" value="" onkeyup="showChinese(this)" onkeydown="checkNum();" />
<div id="wz" class="wz"></div>
<script type="text/javascript">
	/* 调用方法 */
	function showChinese(ele){
		var $val = $(ele).val();
		$("#wz").html(formatMoney($val));
	}
	/* 格式化钱 */
	function formatMoney(val){
		var mnum = parseFloat(val);
		var strOutput="",strTemp="",strInTemp='';
		var unitArray = new Array("圆万亿","仟佰拾","零壹贰叁肆伍陆柒捌玖");
		var mnumArray = mnum.toString().split('.');
		var integralnum = mnumArray[0];
		var integrallen = integralnum.length;
		var decimalnum = (mnum.toString().indexOf('.')>=0) ? mnumArray[1].substr(0, 2) : '0';
		var decimallen = decimalnum.length;
		var ints = parseInt(integrallen/4);
		var inty = integrallen%4;
		if (ints>3 || (ints==3 && inty>0)) return "超出范围";
		if (inty>0){
			ints++;
			integralnum = "0000".substr(inty)+integralnum;
			integrallen = integralnum.length;
		}
		var i = 0;
		while (i<integrallen){
			var strOutTemp = "";
			strTemp = integralnum.substr(i, 4);
			i += 4;
			for (var j=0; j<4; j++){
				strInTemp = parseInt(strTemp.substr(j, 1));
				strOutTemp += unitArray[2].substr(strInTemp, 1);
				if (strInTemp>0 && j<3) strOutTemp += unitArray[1].substr(j, 1);
			}
			strOutTemp = strOutTemp.replace(/零+$/, "");
			ints--;
			if (strOutTemp!="") strOutTemp += unitArray[0].substr(ints, 1);
			if (strTemp.substr(3,1)=='0') strOutTemp += "零";
				strOutput += strOutTemp;
			}
			strOutput = strOutput.replace(/零+/g, "零").replace(/^零/, "").replace(/零$/, "");
			if (strOutput=="圆") strOutput = "";
			if (decimallen==2){
				strOutput += (decimalnum.charAt(0)!='0') ? unitArray[2].substr(parseInt(decimalnum.charAt(0)), 1)+"角" : "零";
			if (strOutput=="零") strOutput = "";
				strOutput += unitArray[2].substr(parseInt(decimalnum.charAt(1)), 1)+"分";
			}else
			{
			if (decimalnum!='0') strOutput += unitArray[2].substr(parseInt(decimalnum), 1)+"角";
			if (strOutput!="") strOutput += "整";
			}
			if (strOutput=="") strOutput = "";
			return strOutput;
	}
	/* 匹配 数字 */
	function checkNum(){
		if(!(event.keyCode==46) &&!(event.keyCode==8) &&!(event.keyCode==37) &&!(event.keyCode==39))
		if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
			event.returnValue=false;
	}
</script>
```

### 倒计时-html

```
var oP=document.getElementsByTagName('p')[0];		
function clock(y,m,d){
	var oDate=new Date();					
	oDate.setFullYear(y,m-1,d);
	oDate.setHours(0,0,0,0);
	var oNow=new Date();
	var ts=oNow.getTime();
	var fs=oDate.getTime()
	var s=parseInt((fs-ts)/1000);
	var d=parseInt(s/86400);
	s%=86400;
	var h=parseInt(s/3600);
	s%=3600;
	var m=parseInt(s/60);
	s%=60;
	oP.innerHTML="离2020年9月15日中秋节还有多少天:"+"<b style='color:red;'>"+d+"</b>"+'天'+"<b style='color:red;'>"+h+"</b>"+'小时'+"<b style='color:red;'>"+m+"</b>"+'分钟'+"<b style='color:red;'>"+s+"</b>"+'秒';					
}
setInterval(function(){
	clock(2020,9,15);
},1000)
```

### 文本超出省略

```
## 文本超出省略
.text-overflow{width:500px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

## .text-overflow-more{width:500px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:3;}
```


### 检查手机类型

```
## 检查手机类型
if((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
    location.replace("http://m.helloweba.com") 
}else{ 
    document.write("请使用手机访问."); 
}
## 9x9 乘法表
function n2n(){
  for (var i = 1; i < 10; i++) {
  	document.write("<ul>");
  	for (var m = 1; m < i; m++) {
  		document.write("<li>" + m + "*" + i + "=" + (m * i) + "</li>");
  	};
  	document.write("</ul>");
  }
}
n2n();
```

### 真与假

```
## 真与假
1   ==  1        // true
"1"  ==  1        // true
1   == '1'       // true
0   == false     // true
0   == null      // false
var object1 = {"value":"key"}, object2={"value":"key"}; 
object1 === object2 //false

0   == undefined // false
null  == undefined // true

bar *= 2     // 10
bar *= "foo" // NaN
bar /= 2     // 2.5
bar /= "foo" // NaN
bar /= 0     // Infinity
2 * 2 // 4
-2 * 2 // -4
Infinity * 0 // NaN
Infinity * Infinity // Infinity
"foo" * 2 // NaN

// 取余
1 / 2      // returns 0.5 in JavaScript
1 / 2      // returns 0 in Java 
// (neither number is explicitly a floating point number)
1.0 / 2.0  // returns 0.5 in both JavaScript and Java
2.0 / 0    // returns Infinity in JavaScript
2.0 / 0.0  // returns Infinity too
2.0 / -0.0 // returns -Infinity in JavaScript
// 乘法
Infinity * 0 // NaN
Infinity * Infinity // Infinity
"foo" * 2 // NaN
// 取模
12 % 5 // 2
-1 % 2 // -1
NaN % 2 // NaN
1 % 2 // 1
2 % 3 // 2
-4 % 2 // -0
5.5 % 2 // 1.5
// Postfix 
var x = 3;
y = x++; // y = 3, x = 4
// Prefix
var a = 2;
b = ++a; // a = 3, b = 3
// Postfix 
var x = 3;
y = x--; // y = 3, x = 2

// Prefix
var a = 2;
b = --a; // a = 1, b = 1

+3     // 3
+"3"   // 3
+true  // 1
+false // 0
+null  // 0
+function(val){  return val } // NaN

"foo" - 3 // NaN

// Assuming the following variables
//  foo = "foo"
//  bar = 5
//  baz = true


// Number + Number -> addition
bar += 2 // 7

// Boolean + Number -> addition
baz += 1 // 2

// Boolean + Boolean -> addition
baz += false // 1

// Number + String -> concatenation
bar += "foo" // "5foo"

// String + Boolean -> concatenation
foo += false // "foofalse"

// String + String -> concatenation
foo += "bar" // "foobar"

// Number + Number -> addition
1 + 2 // 3

// Boolean + Number -> addition
true + 1 // 2

// Boolean + Boolean -> addition
false + false // 0

// Number + String -> concatenation
5 + "foo" // "5foo"

// String + Boolean -> concatenation
"foo" + false // "foofalse"

// String + String -> concatenation
"foo" + "bar" // "foobar"

a1 = true  && true      // t && t returns true
a2 = true  && false     // t && f returns false
a3 = false && true      // f && t returns false
a4 = false && (3 == 4)  // f && f returns false
a5 = "Cat" && "Dog"     // t && t returns "Dog"
a6 = false && "Cat"     // f && t returns false
a7 = "Cat" && false     // t && f returns false
a8 = "" && false        // returns ""
a9 = false && ||        // returns false

o1 = true  || true       // t || t returns true
o2 = false || true       // f || t returns true
o3 = true  || false      // t || f returns true
o4 = false || (3 == 4)   // f || f returns false
o5 = "Cat" || "Dog"      // t || t returns "Cat"
o6 = false || "Cat"      // f || t returns "Cat"
o7 = "Cat" || false      // t || f returns "Cat"
o8 = ""    || false      // returns false
o9 = false || ""         // returns ""

n1 = !true              // !t returns false
n2 = !false             // !f returns true
n3 = !"Cat"             // !t returns false

3 !== '3' // true
4 !== 3   // true

1 !=   2     // true
1 !=  "1"    // false
1 !=  '1'    // false
1 !=  true   // false
0 !=  false  // false

for (var i = 0, j = 9; i <= 9; i++, j--)
console.log("a[" + i + "][" + j + "] = " + a[i][j]);

// Note that the following creates globals and is disallowed in strict mode.
a = b = 3, c = 4; // Returns 4 in console
console.log(a); // 3 (left-most)

x = (y = 5, z = 6); // Returns 6 in console
console.log(x); // 6 (right-most)


var firstCheck = false,
secondCheck = false,
access = firstCheck ? "Access denied" : secondCheck ? "Access denied" : "Access granted";
console.log( access ); // logs "Access granted"
// initial value of false
var bNoParam = new Boolean();
var bZero = new Boolean(0);
var bNull = new Boolean(null);
var bEmptyString = new Boolean('');
var bfalse = new Boolean(false);

// initial value of true
var btrue = new Boolean(true);
var btrueString = new Boolean('true');
var bfalseString = new Boolean('false');
var bSuLin = new Boolean('Su Lin');
var bArrayProto = new Boolean([]);
```


### 清除浮动

```
## 清除浮动
// 伪类 ::after，::before
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
// 结尾处加空标签
.clearfloat{clear:both}
// 触发BFC机制
// 根据 BFC 的规则，计算 BFC 的高度时，浮动元素也参与计算。因此清除浮动，只需要触发一个BFC即可。
position 为 absolute 或 relative
overflow 不为 visible 的块元素
display 为 inline-block, table-cell, table-caption
```

### JSONP原理及简单实现

```
## JSONP原理及简单实现
// script标签中的src属性并没有同源策源的限制,并且只能用于get请求。
function  jsonp(params){
   var script = document.creamentEleent('script');
   var   url = params.url+'?callback' =  + params.callback;
   script.src=url;
   document.body.appendChild(script)
}
function fn(data){
   console.log(data)
}
jsonp({
 url:'',
 callback:fn
})
```

### DNS预解析

```
## DNS预解析
DNS全称为Domain Name System，即域名系统，是域名和IP地址相互映射的一个分布式数据库。
适用于 页面访问多个不同的域名地址
<meta http-equiv="x-dns-prefetch-control" content="off">
<link rel="dns-prefetch" href="http://www.xuanfengge.com/">
## 获取 url 后缀
function parseUrl(src) {
    var a = document.createElement('a');
    a.href = src;
    return  {
        host: a.hostname,
        port: a.port,
        hash: a.hash.replace('#',''),
        query: a.search,
        params: (function() {
            var ret = {};
            var seg = a.search.replace(/^\?/g,'').split('&');
            var len = seg.length;
            var s = [];
            for(var i=0;i< len;i++) {
                if(!seg[i]) continue;
                s = seg[i].split("=");
                ret[s[0]] = s[1];
            }
            return ret;
        })()
    }
}
```

### DOM事件模型

```
## DOM事件模型
DOM事件的级别
DOM0，element.onclick = function(){}
DOM2，element.addEventListener('click', function(){}, false);
指的是冒泡和捕获。
DOM事件流是什么：捕获阶段 -> 目标阶段 -> 冒泡阶段 。
描述DOM事件捕获的具体流程： window --> document --> documentElement(html标签) --> body --> .... --> 目标对象。

## Event对象常见应用
event.preventDefault()，阻止默认行为
event.stopPropagation()，阻止事件冒泡
event.stopImmediatePropagation()，阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上，这个方法不接受任何参数
event.currentTarget，返回绑定事件的元素
event.target，返回触发事件的元素
## 选择器
1.id选择器（ # myid） 
2.类选择器（.myclassname） 
3.标签选择器（div, h1, p） 
4.相邻选择器（h1 + p） 
5.子选择器（ul > li） 
6.后代选择器（li a） 
7.通配符选择器（ * ） 
8.属性选择器（a[rel = "external"]） 
9.伪类选择器（a: hover, li:nth-child）
```

### nodejs 常用

```
## nodejs
1. 单线程（一个人干5个人的活）、事件驱动、非阻塞Io 让 javascript 运行到服务器端开发
2. 单线程 一个用户造成线程的崩溃，整个系统就瘫痪了
3. 非阻塞io 在读文件的时候，先处理下面的变量，再处理回掉函数
4. 事件驱动 通过事件循环调度，执行事件队列，完成服务器的任务调度（遇见 io 再次放入到事件队列里去循环）
5. nodejs 是运行在服务器上的，返回的结果都是在后台运算处理完的数据
6. nodejs 通过 req.url 等于不同的路径来显示 不同的页面 如果接收的req.url 路径是什么，就让 res.end() 返回什么
## http模块
创建服务器 
var server = http.createServer(function(req,res){ ... })
设置响应头 
res.writeHead(200, { "Content-Type": "text/html;charset=utf8" })
输出结束内容 
res.end(data);
设置端口 
server.listen(3000,'127.0.0.1')
## 模块 url
req.url 表示用户的请求 url 地址。所有的路由设计都是通过 req.url 来实现的。 会忽略链接地址后#的参数
req.path 返回 /a/b?q="h"
req.pathname 返回 /a/b
req.query 返回 q="h"
识别 url 工具 : url 模块和 querystring 模块

不包含 http 根 和 参数的路径(/a/bc/)： 
var path = url.parse(req.url).pathname
查询的字符串（?usename） 
var query = url.parse(req.url).query
查询的字符串对象 
var query = url.parse(req.url,true).query
## 模块 fs
fs.stat(path[, options], callback)
读取一个文件属性信息 
stats.isDirectory() stats.isFile() stats.size
读取文件夹中的文件夹数组,创建临时数组
fs.stat() => statu.isDirectory() => push 到临时数组中,循环中包含异步语句程序会有错误，解决方法需要把异步变成同步。
方案一：利用闭包+回调函数 （function fn(i) { fs.stat(err, function() { fn(i+1) }) ）(0)
文件名：var pathname = url.parse(req.url).pathname; // get pathname
文件路径：var fileUrl = './' + path.normalize("./static/" + pathname);
扩展名：var extname = path.extname(pathname);
## 导入导出模块
模式一：
exports.msg = "hello world" 
var foo = require("foo")
模式二：
1. 一个类的暴露 module.export = 构造函数名 
module.exports = Person 
var p = new Person("wxh",20); 
p.say();
在 js 模块中不要在封装一个对象了，因为，exports 就是暴露的顶层变量，不要在新增多余的顶层变量了。
node js 中 js 文件和 js 文件，就是被一个个 exports 和 require 构建成网状结构引用
npm 全球统一的 模块管理平台，可以引用别人开发好的模块
```

### 文件路径 

```
## 文件路径 
__dirname 自身的路径 例如：__dirname + "/1.txt" 
1. fs 读取文件路径的时候尽量使用绝对地址
2. post 请求 ， 写在 http 的报文 的 body 中，将数据拆分成多个小数据块，然后通过特定的事件，将这些小的数据块有序的传递给回调函数。
3. 获取请求路径 req.url == "/dopost" 
4. 判断方法 req.method.toLowerCase == "post"
5. 监听事件 
req.addListener("data", fn(chunk))
req.addListener("end", function() { res.end("success"); })
6. querystring 链接编码 querystring.parse(datastring)
7. 时间模块
silly-datetime 
var time = sd.formate(new Date,'yyyymmdd')
改名
fs.rename('./a.txt','./b.txt') 
五位数的随机数
parseInt(Math.random() * 8999 + 10000)
8. formidable 处理大文件上传 如 : file 文件 
var form = new formidable.IncomingForm() 
只要涉及到文件上传 form 中就需要加入 
enctype="multipart/form-data"
```

### this 的理解

```
## this 的理解
var length = 10;
function fn () {
    console.log(this.length); // this === window = 输出 10 
}
// 当执行 arguments0; 时，其实调用了 fn()。
// 而这时，fn 函数中 this 就指向了 arguments，这个特殊的对象。
// obj.method 方法接收了 2 个参数，所以 arguments 的 length，很显然就是 2 。
var obj = {
    length: 5,
    method: function (fn) {
        fn();
        // 在这里用call 将 this 指向 obj 自己
        fn.call(this); // 输出5 修改了 this 的指向
        arguments[0](); 
    }
};
obj.method(fn, 1);
window.val = 1;
var obj = {
    val: 2,
    dbl: function () {
        // 第一次的 this 指向 obj。所以，2 * 2 得 4。
        // 第二次的调用者变为了 window。this.val 等价于 window.val，
        // 第一次运算之后，window.val 已经为 2 了， 再 * 2 得到的结果就为 4 了。
        this.val *= 2; 
        
        // 第一次的 val 的调用者是 window。1 * 2 得 2。
        
        // 第二次的 val 的调用者还是 window，
        // 执行到此处时，window.val 已经为 4 了，再 * 2 的结果就是 8 了。
        val *= 2;    
        
        // 第二次的调用者都是 window，所以两行打印的结果是一样的，都是8。
        console.log('val:', val);
        console.log('this.val:', this.val);
    }
};
 // 说出下面的输出结果
 obj.dbl(); // 2 4
 var func = obj.dbl;
 func(); // 8 8
function fn() {
  console.log(this); // 1. {a: 100}
  var arr = [1, 2, 3];
  (function() {
    console.log(this); // 2. Window
  })();
  // 普通 JS
  arr.map(function(item) {
    console.log(this); // 3. Window
    return item + 1;
  });
  // 箭头函数
  let brr = arr.map(item => {
    console.log("es6", this); // 4. {a: 100}
    return item + 1;
  });
}
fn.call({ a: 100 });
function run() {
  const inner = () => {
    return () => {
      console.log(this.a)
    }
  }
  inner()()
}
run.bind({a: 1})() // Output: 1
function run() {
  console.log(this.a)
}
run.bind({a: 1})() // output: 1
// 多次bind，上下文由第一个bind的上下文决定
run.bind({a: 2}).bind({a: 1})() // output: 2
```

### 变量提升

```
## 变量提升
(function(){ 
    var a='One'; 
    var b='Two'; 
    var c='Three'; 
})()
// 等同于
(function(){ 
    var a,b,c; 
    a='One'; 
    b='Two'; 
    c='Three'; 
})()
var v='Hello World'; 
(function(){
    // var v;
    alert(v); // undefined
    var v='I love you'; 
})()
const aa = 11;
alert(aa) //11
aa = 22;
## alert(aa) //报错
```



### 事件循环

```
## 事件循环
### script(主程序代码)—>process.nextTick—>Promises…——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering

setTimeout(function(){console.log(1)},0);
console.log(2)
//输出2,1


setTimeout(function () {
  console.log(3);
}, 0);
Promise.resolve().then(function () {
  console.log(2);
});
console.log(1);
//输出为  1  2 3


setTimeout(function(){console.log(1)},0);
new Promise(function(resolve,reject){
   console.log(2);
   resolve();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});
process.nextTick(function(){console.log(5)});
console.log(6);
//输出2,6,5,3,4,1


setTimeout(function(){console.log(1)},0);
new Promise(function(resolve,reject){
   console.log(2);
   setTimeout(function(){resolve()},0)
}).then(function(){console.log(3)
}).then(function(){console.log(4)});
process.nextTick(function(){console.log(5)});
console.log(6); //输出的是  2 6 5 1 

```

###  VUE axios跨域

```
## VUE axios使用方法与跨域问题解决

// config/index.js 
proxyTable: {
    '/api': {
      target: 'http://www.centby.com',// 设置你调用的接口域名和端口号 别忘了加http
      changeOrigin: true,//如果需要跨域
      pathRewrite: {
        '^/api': 'http://www.centby.com',//调用接口直接写‘/api/user/add’即可
      }
    }
}
```

### 配置 babel

```
// 配置 babel
yarn add babel-cli
yarn add babel-preset-es201
yarn add babel-plugin-transform-runtime
yarn add babel-runtime
// .babelrc
{
  "presets": ["es2015"],
  // without options "stage-1"
  {
    "plugins": ["stage-3","transform-runtime"]
  }
}
// 运行
# 单文件
babel-node code1.js
# 文件夹
babel -w code/ -d build/
```

### mysql

```
## mysql 创建表
CREATE TABLE tab_msgs (
  id INT UNSIGNED not null PRIMARY KEY auto_increment COMMENT "主键ID",
  title VARCHAR(30) COMMENT "标题",
  msg VARCHAR(200) COMMENT "短信内容",
  etime datetime	not null default now() COMMENT "最后修改时间",
  estime datetime not null default now() COMMENT "最后审核时间",
  writer VARCHAR(20) COMMENT "作者",
  types TINYINT not null default 1 COMMENT "适配类型 0 1",
  status TINYINT not null DEFAULT 1 COMMENT "状态 0 冻结 1 非冻结"
) ENGINE=INNODB CHARSET=utf8 COMMENT "短信表"

## mysql 插入数据
INSERT INTO tab_msgs(id,title,msg,writer,types,status) VALUES(NULL,'动感地带专刊','眼球的运动能够表达人得想法。
```


### 二分查找法

```
## 二分查找法
解析：二分查找，也为折半查找。首先要找到一个中间值，通过与中间值比较，大的放又，小的放在左边。再在两边中寻找中间值，持续以上操作，直到找到所在位置为止。
## 递归方法
function binarySearch(data,item,start,end){
  var end=end || data.length-1;
  var start=start || 0;
  var m=Math.floor((start+end)/2);
  if(item==data[m]){
    return m;
  }else if(item<data[m]){
   return binarySearch(data,item,start,m-1) //递归调用
  }else{
   return binarySearch(data,item,m+1,end);
  }
  return false;
 }

 var arr=[34,12,5,123,2,745,32,4];
 binary(arr,5);
 
## 非递归方法
function binarySearch(data, item){
    var h = data.length - 1,
    l = 0;
    while(l <= h){
        var m = Math.floor((h + l) / 2);
        if(data[m] == item){
            return m;
        }
        if(item > data[m]){
            l = m + 1;
        }else{
           h = m - 1;
        }
    }
    return false;
}
var arr=[34,12,5,123,2,745,32,4];
binarySearch(arr,5);
```

### vue 常用操作

```
:class="{'show':isOpen}"  // 属性变量开关 可以传给 v-bind:class 一个对象，以动态地切换 class

@click="hide" // 定义事件

{{checkboxValue.length}}  // 输出变量

ref="list"  // 定义ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。

v-for="(item,index) in dataList" // 定义数据循环

:data-val="item.label + '|' + item.value" // 自定义属性

v-if="item.address" // if条件

v-model="checkboxValue" // 创建自定义功能可复用的input

:value="item.label + '|' + item.value" // 给input赋动态的值
// 在模板中定义自定义组件
<checklist ref="checklist"
               :data-list="data"
               :max="2" @on-change="changeKaochangValue"></checklist> 

// 编译class
<div :class="[{ active: active }, isButton ? prefix + '-button' : null]">
<div :class="{ active, [`${prefix}-button`]: isButton }">

// v-for 循环
<li v-for="{ id, text } in items" :key="id">
  {{ id }} {{ text }}
</li>

## 热重载
webpack-dev-server --hot
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload: false // 关闭热重载
      }
    }
  ]
}
```

### less 使用

```
## less 使用
<link rel="stylesheet/less" href="less文件">
<script src="less-2.5.3.min.js"></script>
## 样式文件
@link-color: #000; 

.box {
  .centerPos(200, 200);
  width: 200px;
  height: 200px;
  background: skyblue;
  a {
    color: @link-color;
  }
}  
```

### do ... while

```
## do ... while 循环
const list = ['a', 'b', 'c']
let i = 0;
do {
	console.log(i,list[i]);
	i = i+1;
}while(i < list.length)
i = 0;
do {
  if (i == 1) {
  	console.log("i=>>>>>>>>>>>",list[i]);
  	break; // 中断循环
  }
  i = i + 1;
} while (i < list.length)

## for ... of 迭代属性值
## for...in 迭代属性名称
for (const [index, value] of ['a', 'b', 'c'].entries()) {
  console.log(index) //index
  console.log(value) //value
}
```


### 工厂模式

```
## 工厂模式
优点： 可以无限次调用这个工厂函数，生成多个属性和方法相似的对象。
缺点：没有解决对象识别问题，不能知道一个对象的类型。
function Person(name,age) {
	var obj =  {}
	obj.name = name;
	obj.age = age;
	obj.sayName = function() {
		console.log(this.name);
	}
	return obj
}
var p = Person('willian',40);
var p2 = Person('john', 50);
console.log(p);
console.log(p2);

## 构造函数模式
优点：没有显示的创建对象，使用 new 调用构造函数。new 执行的过程：①创建一个新对象；②将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；③执行构造函数中的代码（为这个新对象添加属性）；④返回新对象。

缺点：在this.sayName 方法的时候， 每个方法都要在每个实例上重新创建一遍，完全没必要创建两个新的Function 实例。所以，可以通过 创建全局的 sayName 方法，避免这个问题。但是，如果对象需要定义很多方法，那么就需要定义很多个全局函数，就不是封装模式了。

function Person(name,age) {
	this.name = name;
	this.age = age;
	this.sayName = function() {
		console.log(this.name);
	}
}
var p = new Person('willian',40);
var p2 = new Person('john', 50);
console.log(p);
console.log(p2);

```


### 原型模式

```
## 原型模式
将信息直接添加到原型对象上。使用原型的好处是可以让所有的实例对象共享它所包含的属性和方法，不必在构造函数中定义对象实例信息，而是可以将这些信息直接添加到原型对象中。

在默认情况下，所有prototype属性都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。

在读取某个对象的某个属性时，搜索的过程是：对象上搜索 -> 对象的原型链上搜索 。

// 方式一：
function Person() {}
Person.prototype.name = "john";
Person.prototype.age = 40;
Person.prototype.sayName = function() {
	console.log(this.name);	
}
var person1 = new Person();
person1.sayName();

// 方式二：
function Person(){    
}
Person.prototype = {
    name : "Mike",
    age : 29,
    job : "engineer",    
    syaName : function(){
        alert( this.name );
    }
};

## 组合使用构造函数模式和原型模式
function Person(name) { 
 this.name = name; 
 this.friends = ['Jack', 'Merry']; 
} 
Person.prototype.sayName = function() { 
 console.log(this.name); 
} 
var person1 = new Person(); 
var person2 = new Person(); 
person1.friends.push('Van'); 
console.log(person1.friends) //["Jack", "Merry", "Van"] 
console.log(person2.friends) // ["Jack", "Merry"] 
console.log(person1.friends === person2.friends) //false 

## 寄生构造函数模式
这种模式的基本思想就是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新建的对象。

使用new操作符，创建对象。和 工厂模式一样。

function Person(name, job) { 
  var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(this.name) 
 } 
 return o 
} 
var person1 = new Person('Mike', 'student') 
person1.sayName() 

## 稳妥构造函数模式
稳妥对象指的是没有公共属性，而且其方法也不引用this。稳妥对象最适合在一些安全环境中(这些环境会禁止使用this和new)，或防止数据被其他应用程序改动时使用。

稳妥构造函数模式和寄生模式类似，有两点不同:

1. 是创建对象的实例方法不引用this；
2. 不使用new操作符调用构造函数
function Person(name, job) { 
 var o = new Object();
 o.name = name;
 o.job = job;
 o.sayName = function() { 
  console.log(name) //注意这里没有了"this"；
 } 
 return o 
} 
var person1 = Person('Mike', 'student') 
person1.sayName();
```

### 星级评分

```
## 星级评分
// 时间基于1970-1-1（世界标准时间）起的毫秒数，时间戳长度通常为13位。
function getRating(rating) {
    if(rating > 5 || rating < 0) throw new Error('数字不在范围内');
    return '★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating );
}
console.log(getRating(3));
## 随机字符串 ece1vj0svj
console.log(Math.random().toString(36).substr(2,10)); 
## 多行字符串格式化
var myString = (function () {/*
   <div id="someId">
     some content<br />
     <a href="#someRef">someRefTxt</a>
    </div>        
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

console.log(myString);

## 获取函数名
function where() {
	return where.caller.name;
}
function doWhere() {
	var name = where();
	console.info(name);
}
doWhere();
## 条件判断
var a = b && 1; 相当于
if (b) {  a = 1}
var a = b || 1; 相当于
if (b) {  a = b;} else {  a = 1;}

## 类数组对象转数组：
var arr = [].slice.call(arguments)

## 漂亮的随机码：
Math.random().toString(16).substring(2);
Math.random().toString(36).substring(2);

## 合并数组：
var a = [1,2,3];var b = [4,5,6];
Array.prototype.push.apply(a, b);

## express server
var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', (req,res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('hello express 123')
})
app.listen(3000, err => {
	if(!err){
		console.log('服务器启动成功');
	}
});

```

### 数字取余数

```
数字取余数 和 求模运算

1. 12345 / 10  = 1234.5  => num1
2. 12345 % 10 = 5
3. 判断递归循环结束条件 num1 < 1 表示取到最后一位
4. 取整数 Math.floor(num1)  等于 1234
5. 进行递归循环 {num2} {fun(num1)}`  5+4321 , 5 + 4 + 321 , 5 + 4 + 3 + 21 , 54321
function fun(num) {
    let num1 = num / 10;
    let num2 = num % 10;
    if(num1 < 1) {
      return num
    }else {
      num1 = Math.floor(num1)
      return ${num2}${fun(num1)}
    }
}
var a = fun(12345)
console.log(54321,a)
```
### 对象转字符串

```
const obj = {
     id: 0,
     name: '张三',
     age: 12
}
const objToStr = JSON.stringify(obj)
console.log('obj:', obj)
console.log('objToStr:', objToStr)
```
###  深克隆

```
// 主要是针对对象的克隆
function deepCopy (param) {
  // 数组 、 对象 、 普通值
  let res = null
  // 取类型
  let type = Object.prototype.toString.call(param)
  // 对象 - 递归
  if (type === '[object Object]') {
    res = {}
    for (const key in param) {
      res[key] = deepCopy(param[key])
    }
  } else if (type === '[object Array]') {
    // 数组 - 递归
    res = []
    param.forEach((item, index) => {
      res[index] = deepCopy(item)
    })
  } else {
    // 普通类型
    res = param
  }
  return res
}
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: {
    name: '我是一个对象',
    id: 1,
    qwe: {
      a: 1
    }
  },
  arr: [0, 1, 2, { b: 2 }],
  date: new Date(0),
  hello: Symbol(),
  func () {
    console.log(123)
  }
};
let cloneObj = deepCopy(obj);
console.log(obj, cloneObj)
```
### 发布订阅模式

```

发布订阅模式
1. 发布者 - 发布事件
2. 定义事件触发器
3. 订阅者 - 调用触发器

// {女生失恋：['苦','吃','逛']}
function Girl(){
  this.events = {}
}
// 发布事件列表，绑定回调函数
Girl.prototype.on = function(eventName,callback){
  // 事件列表里是否已经定义该事件
  if(this.events[eventName]) {
    // 绑定事件名称和回调函数的关系
    this.events[eventName].push(callback); 
    // {失恋：[cry,eating,shopping]}
  }else{
    // 没有定义该事件，直接存入数组，并把回调事件存入数组中
    this.events[eventNam] = [callback]; // 第一次 数组里放 callback
  }
}
// 定义事件触发器
Girl.prototype.emit = function(eventName,...params) {
  // 事件列表里是否已经定义该事件
  if(this.events[eventName]) {
    // 循环该事件名称的数组，依次把回调函数指向给当前实例
    this.events[eventName].forEach((item) => {
       // item(...params);
       item.apply(this,params)
    })
  }
}
// 定义订阅者 - 调用触发器
let cry = (who) => {
    console.log(who + "哭");
}
let shopping = (who) => {
    console.log(who + "购物");
}
let eating = (who) => {
    console.log(who + "吃");
}
let girl = new Girl();
// 事件 绑定
girl.on("失恋",cry);
girl.on("失恋",shopping);
girl.on("失恋",eating);
// 触发
// girl.emit("失恋");
// 传参
girl.emit("失恋","我")
```
### 规范UMD

```
// 可以兼容 amd 和 commonjs 的规范
// UMD 规范
(function (root, carousel) {
  if (typeof define == 'function' && define.amd) {
    // 判断是否使用AMD规范
    define([], carousel);
  } else if (typeof module == 'object' && module.exports) {
    // 判断是否使用 CommonJS 规范
    module.exports = carousel;
  } else {
    // 公出
    window.carousel = carousel;
  }
}(window, function (window, document) {
  // 创建函数
  function carousel () { }
  carousel.prototype = {

  }
  return carousel;
}(window, document)))
// var carousel = new carousel();

```
### 下载视频

```
const url = 'https://v.weishi.qq.com/v.weishi.qq.com/shg_0_1047_rsueafabs5qbbmcagbagbedvrxzwb6a264n6bibaqaafaiga.f0.mp4?dis_k=bb034e72483b875b70fad5feb12c63f0&dis_t=1563845358&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=1535252226705971';
const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.onprogress = function(pe) {
  console.log('progress');
  if (pe.lengthComputable) {
    console.log((pe.loaded / pe.total) * 100);
  }
};
xhr.onload = function(e) {
  if (this.status == 200) {
    window.open(
      window.URL.createObjectURL(
        new Blob([this.response], { type: 'application/video' })
      )
    );
  }
};
xhr.send();

```
### 拖拽上传

```
function handleDropover(event) {
  event.stopPropagation();
  event.preventDefault();
}
function handleDrop(event) {
  event.stopPropagation();
  event.preventDefault();
  /* 访问拖拽文件 */
  const files = event.dataTransfer.files;
  console.log(files);
  /**/
}
const target = document.querySelector('#container');
target.addEventListener('dragover', handleDropover);
target.addEventListener('drop', handleDrop);

```
### 日期格式化

```
const dateFormatter = (formatter, date) => {
  date = date ? new Date(date) : new Date();
  const Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formatter
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s);
};
dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55'); // 1995-02-15 13:55
```
### 读取本地上传图片

```
function handleFileSelect(event) {
  const { files } = event.target;
  if (!files.length) {
    return;
  }
  let vm = document.createDocumentFragment(),
    re = /image.*/,
    loaded = 0, // 完成加载的图片数量
    total = 0; // 总共图片数量
  // 统计image文件数量
  for (const file of files) {
    re.test(file.type) && total++;
  }
  // onloadstart回调
  const handleLoadStart = (ev, file) =>
    console.log(>>> Start load ${file.name});
  // onload回调
  const handleOnload = (ev, file) => {
    console.log(<<< End load ${file.name});
    const img = document.createElement('img');
    img.height = 250;
    img.width = 250;
    img.src = ev.target.result;
    vm.appendChild(img);
    // 完成加载后，将其放入dom元素中
    if (++loaded === total) {
      document.querySelector('#images').appendChild(vm);
    }
  };
  for (const file of files) {
    if (!re.test(file.type)) {
      continue;
    }
    const reader = new FileReader();
    reader.onloadstart = ev => handleLoadStart(ev, file);
    reader.onload = ev => handleOnload(ev, file);
    // 读取文件对象
    reader.readAsDataURL(file);
  }
}
document
  .querySelector('#files')
  .addEventListener('change', handleFileSelect, false);
```