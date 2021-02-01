/**
 * 定义一个树
 */
var element = {
  tag: "ul", // 节点标签名
  attrs: {
    // DOM的属性，用一个对象存储键值对
    id: "list"
  },
  children: [
    // 该节点的子节点
    { tag: "li", attrs: { class: "item" }, children: ["Item 1"] },
    { tag: "li", attrs: { class: "item" }, children: ["Item 2"] },
    { tag: "li", attrs: { class: "item" }, children: ["Item 3"] }
  ]
}

// 虚拟 dom
function Element(tag, attrs, children) {
  this.tag = tag
  this.attrs = attrs
  this.children = children
}

function el(tag, attrs, children) {
  return new Element(tag, attrs, children)
}

var ul = el("ul", { id: "list" }, [
  el("li", { class: "item" }, ["Item 1"]),
  el("li", { class: "item" }, ["Item 2"]),
  el("li", { class: "item" }, ["Item 3"])
])

console.log(ul)

Element.prototype.render = function () {
  // 获取属性
  let el = document.createElement(this.tag)
  let attrs = this.attrs

  // 设置属性
  for (let attrName in attrs) {
    el.setAttribute(attrName, attrs[attrName])
  }

  // 设置子元素 递归
  let children = this.children || []
  children.forEach((child) => {
    let childEle =
      child instanceof Element ? child.render() : document.createTextNode(child)
    el.appendChild(childEle)
  })
  return el
}
let _ul = ul.render()
document.body.appendChild(_ul)

/**
 * 比对树的改变
 */
function diff(oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}
