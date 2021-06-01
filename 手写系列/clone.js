// 乞巧版
function cloneDeep1(source) {
  return JSON.parse(JSON.stringify(source));
}
// 递归版
function cloneDeep2(source) {
  // 如果输入的为基本类型，直接返回
  if (!(typeof source === "object" && source !== null)) {
    return source;
  }

  // 判断输入的为数组函数对象，进行相应的构建
  const target = Array.isArray(source) ? [] : {};

  for (let key in source) {
    // 判断是否是自身属性
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source === "object" && source !== null) {
        target[key] = cloneDeep2(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
// 循环方式
function cloneDeep3(source) {
  if (!(typeof source === "object" && source !== null)) {
    return source;
  }

  const root = Array.isArray(source) ? [] : {};
  // 定义一个栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length > 0) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = Array.isArray(data) ? [] : {};
    }

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === "object" && data !== null) {
          loopList.push({
            parent: res,
            key: key,
            data: data[key],
          });
        } else {
          res[key] = data[key];
        }
      }
    }
  }

  return root;
}
