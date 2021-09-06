# 30-seconds-of-css

## 是什么

30s css 代码块

### clearfix

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### 按钮

```css
.button {
  background-color: #1477fb;
  border: none;
  color: #fff;
  padding: 12px 40px;
  position: relative;
}
.button:before,
.button:after {
  border: 0;
  content: "";
  height: 24px;
  width: 24px;
  position: absolute;
  transition: all 0.25s;
}
.button:before {
  border-top: 2px solid #1477fb;
  left: 0px;
  top: -5px;
}
.button:after {
  border-bottom: 2px solid #1477fb;
  bottom: -5px;
  right: 0px;
}
.button:hover {
  background-color: #1477fb;
}
.button:hover:before,
.button:hover:after {
  height: 100%;
  width: 100%;
}
```

```html
<div class="button-border">
  <button class="button">提交</button>
</div>
```

### 高度全屏

```
padding:100%;
```

### flex 布局

```html
<style>
  .evenly-distributed-children {
    display: flex;
    justify-content: space-between;
  }
  .flexbox-centering {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
</style>

<div class="evenly-distributed-children">
  <p>Item1</p>
  <p>Item2</p>
  <p>Item3</p>
</div>
<div class="flexbox-centering">
  <div class="child">Centered content.</div>
</div>
```

### grid 布局

```html
<style>
  .grid-centering {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100px;
    border: 1px solid #333;
    background: #f2f2f2;
  }
</style>

<div class="grid-centering"><div class="child">Centered content.</div></div>
```

### Transform 居中

```html
<style>
  .parent {
    position: relative;
    width: 250px;
    height: 250px;
    border: 1px solid #333;
  }
  .child {
    position absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align:center;
  }
</style>

<div class="parent"><div class="child">Centered content</div></div>
```

### 省略号

```html
<style>
  .truncate-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
  }
</style>

<p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
```

### 自定义滚动条

```html
<style>
  .custom-scrollbar {
    height: 70px;
    overflow-y: scroll;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
</style>

<div class="custom-scrollbar">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit?
  </p>
</div>
```

### select 选择高亮

```html
<style>
  ::selection {
    background: aquamarine;
    color: black;
  }
  .custom-text-selection::selection {
    background: deeppink;
    color: white;
  }
</style>
<p class="custom-text-selection">Select some of this text.</p>
```

### 图片充满

```html
<style>
  .image {
    background: #34495e;
    border: 1px solid #34495e;
    width: 200px;
    height: 200px;
  }
  .image-contain {
    object-fit: contain; /*保持原有尺寸比例。内容被缩放*/
    object-position: center;
  }
  .image-cover {
    object-fit: cover; /*保留原始比例。对图片进行剪切*/
    object-position: right top;
  }
</style>

<img class="image image-contain" src="https://picsum.photos/600/200" />
<img class="image image-cover" src="https://picsum.photos/600/200" />
```

### 全屏

```html
<style>
  .container {
    margin: 40px auto;
    max-width: 700px;
  }
  .element {
    padding: 20px;
    height: 300px;
    width: 100%;
    background-color: skyblue;
  }
  .element p {
    text-align: center;
    color: white;
    font-size: 3em;
  }
  .element:-ms-fullscreen p {
    visibility: visible;
  }
  .element:fullscreen {
    background-color: #e4708a;
    width: 100vw;
    height: 100vh;
  }
</style>
<!--requestFullscreen 全屏函数-->
<div class="container">
  <p>
    <em>Click the button below to enter the element into fullscreen mode. </em>
  </p>
  <div class="element" id="element">
    <p>I change color in fullscreen mode!</p>
  </div>
  <br />
  <button
    onclick="var el = document.getElementById('element'); el.requestFullscreen();"
  >
    Go Full Screen!
  </button>
</div>
```

### 下划线

```html
<style>
  .pretty-text-underline {
    display: inline;
    text-shadow: 1px 1px #f5f6f9, -1px 1px #f5f6f9, -1px -1px #f5f6f9, 1px -1px
        #f5f6f9;
    background-image: linear-gradient(
      90deg,
      currentColor 100%,
      transparent 100%
    );
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100% 1px;
  }
  .pretty-text-underline::-moz-selection {
    background-color: rgba(0, 150, 255, 0.3);
    text-shadow: none;
  }
  .pretty-text-underline::selection {
    background-color: rgba(0, 150, 255, 0.3);
    text-shadow: none;
  }
</style>

<span class="pretty-text-underline">标签1</span>
<span class="pretty-text-underline">标签2</span>
<span class="pretty-text-underline">标签3</span>
<span class="pretty-text-underline">标签4</span>
```

### svg

```html
<style>
  .shape-separator {
    position: relative;
    height: 48px;
    background: #333;
  }
  .shape-separator::after {
    content: "";
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12'%3E%3Cpath d='m12 0l12 12h-24z' fill='%23fff'/%3E%3C/svg%3E");
    position: absolute;
    width: 100%;
    height: 12px;
    bottom: 0;
  }
</style>

<div class="shape-separator"></div>
```

### 修改字体

```html
<style>
  .system-font-stack {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
  }
</style>

<p class="system-font-stack">This text uses the system font.</p>
```

### 三角实心图标

```html
<style>
  .triangle {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 20px solid #333;
    border-right: 20px solid transparent;
  }

  // 向上
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #333;
  // 向下
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #333;
  // 向左
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #333;
  // 向右
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #333;
</style>

<div class="triangle"></div>
```

### 改变 css 变量值

```html
<style>
  .el {
    transition: max-height 0.5s;
    overflow: hidden;
    max-height: 0;
  }
  .trigger:hover > .el {
    max-height: var(--max-height);
  }
</style>
<div class="trigger">
  Hover me to see a height transition.
  <div class="el">content</div>
</div>
<script>
  var el = document.querySelector(".el");
  var height = el.scrollHeight;
  el.style.setProperty("--max-height", height + "px");
</script>
```

### 高亮 nav

```html
<style>
  span {
    padding: 0 1rem;
    transition: opacity 0.2s;
  }
  .sibling-fade:hover span:not(:hover) {
    opacity: 0.5;
  }
</style>

<div class="sibling-fade">
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
  <span>Item 4</span>
  <span>Item 5</span>
  <span>Item 6</span>
</div>
```

### checkbox 样式

```html
<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
  }
  .switch::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: all 0.3s;
  }
  input[type="checkbox"]:checked + .switch::after {
    transform: translateX(20px);
  }
  input[type="checkbox"]:checked + .switch {
    background-color: #1477fb;
  }
  .offscreen {
    position: absolute;
    left: -9999px;
  }
</style>
<input type="checkbox" id="toggle" class="offscreen" />
<label for="toggle" class="switch"></label>
```

### calc()

```html
<style>
  .box-example {
    height: 280px;
    background: #222 url("https://image.ibb.co/fUL9nS/wolf.png") no-repeat;
    background-position: calc(100% - 20px) calc(100% - 20px);
  }
</style>
<div class="box-example"></div>
```

### 树形结构

```html
<style>
  ul {
    counter-reset: counter;
  }
  li::before {
    counter-increment: counter;
    content: counters(counter, ".") " ";
  }
</style>
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>
```

### div 右上方三角形

```html
<style type="text/css">
  body {
    background-color: #f5f5f5;
  }
  .react-box {
    position: relative;
    width: 500px;
    height: 340px;
    border: 1px solid #ddd;
    margin: 50px auto;
    background: #fff;
  }
  .react-box .triangle {
    position: absolute;
    right: -60px;
    top: -60px;
    border: 60px solid transparent;
    border-bottom-color: #f90;
    transform: rotate(45deg);
  }
  .react-box span {
    position: absolute;
    color: #fff;
    font-size: 19px;
    transform: rotate(45deg);
    right: 6px;
    top: 17px;
  }
  .react-box {
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgb(0, 0, 0, 0.2);
    border: 0;
  }

  /* 添加与阴影颜色相同来形成三角形的阴影效果 */
  .react-box:before {
    position: absolute;
    bottom: -21px;
    right: 110px;
    z-index: 999;
    border-top: 20px solid rgba(0, 0, 0, 0.2);
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    content: "";
  }
  .react-box:after {
    position: absolute;
    bottom: -17px;
    right: 110px;
    z-index: 999;
    border-top: 20px solid #fff;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    content: "";
  }
</style>

<!-- 三角形开始 -->
<div class="react-box">
  <div class="triangle"></div>
  <span>三角形</span>
</div>
<!-- end -->
```

### loading 加载

```html
// 效果一
<style>
  .loading {
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-top: 100px;
  }
  .loading span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    -webkit-animation: load 1s ease infinite;
  }
  @-webkit-keyframes load {
    0%,
    100% {
      height: 40px;
      background: lightgreen;
    }
    50% {
      height: 70px;
      margin: -15px 0;
      background: lightblue;
    }
  }
  .loading span:nth-child(2) {
    -webkit-animation-delay: 0.2s;
  }
  .loading span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
  }
  .loading span:nth-child(4) {
    -webkit-animation-delay: 0.6s;
  }
  .loading span:nth-child(5) {
    -webkit-animation-delay: 0.8s;
  }
</style>
<div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

// 效果二：
<style>
  .loading {
    width: 150px;
    height: 15px;
    margin: 0 auto;
    margin-top: 100px;
  }
  .loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    border-radius: 50%;
    background: lightgreen;
    -webkit-animation: load 1.04s ease infinite;
  }
  .loading span:last-child {
    margin-right: 0px;
  }
  @-webkit-keyframes load {
    0% {
      opacity: 1;
      -webkit-transform: scale(1.3);
    }
    100% {
      opacity: 0.2;
      -webkit-transform: scale(0.3);
    }
  }
  .loading span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
  }
  .loading span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
  }
  .loading span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
  }
  .loading span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
  }
  .loading span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
  }
</style>
<div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

// 效果三：
<style>
  .loadEffect {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
  }
  .loadEffect span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: lightgreen;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }
  @-webkit-keyframes load {
    0% {
      -webkit-transform: scale(1.2);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0.3);
      opacity: 0.5;
    }
  }
  .loadEffect span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -10px;
    -webkit-animation-delay: 0.13s;
  }
  .loadEffect span:nth-child(2) {
    left: 14px;
    top: 14px;
    -webkit-animation-delay: 0.26s;
  }
  .loadEffect span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -10px;
    -webkit-animation-delay: 0.39s;
  }
  .loadEffect span:nth-child(4) {
    top: 14px;
    right: 14px;
    -webkit-animation-delay: 0.52s;
  }
  .loadEffect span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -10px;
    -webkit-animation-delay: 0.65s;
  }
  .loadEffect span:nth-child(6) {
    right: 14px;
    bottom: 14px;
    -webkit-animation-delay: 0.78s;
  }
  .loadEffect span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    -webkit-animation-delay: 0.91s;
  }
  .loadEffect span:nth-child(8) {
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay: 1.04s;
  }
</style>
<div class="loadEffect">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
// 效果四
<style>
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -1rem, 0);
    }
  }
  .bouncing-loader {
    display: flex;
    justify-content: center;
  }
  .bouncing-loader > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  .bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  .bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
  }
</style>
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```

### 进度条

```html
<style>
  @keyframes donut-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .donut {
    display: inline-block;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #7983ff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: donut-spin 1.2s linear infinite;
  }
</style>
<div class="donut"></div>
```

### 箭头 图标

```
.home_list li:after {
    position: absolute;
    right: 10px;
    top: 50%;
    display: inline-block;
    content: "";
    width: 7px;
    height: 7px;
    border: solid #999;
    border-width: 1px 1px 0 0;
    -webkit-transform: translate(0,-50%) rotate(45deg);
    transform: translate(0,-50%) rotate(45deg);
}
```

## 对号

```
div:before {
    content: "";
    display: block;
    border-left: 5px solid #000;
    border-bottom: 5px solid #000;
    background: transparent;
    width: 25px;
    height: 10px;
    transform: rotate(-45deg);

  /* Only for positioning */
    position: relative;
    left: 10px;
    top: 5px;
}
```
