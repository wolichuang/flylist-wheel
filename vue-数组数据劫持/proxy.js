// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

let wxh = {
  name: '王小花',
  age: 33,
  colors: ['yellow', 'red', 'blue'],
  hobby: {
    one: 'sing',
    two: 'running',
    three: 'swimming'
  }
};

// console.log(wxh);

// 多级对象
function defineReactiveObserver(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      obj[key] = defineReactiveObserver(obj[key]);
    }
  });
  // 监听
  return new Proxy(obj, {
    get(target, key) {
      console.log('get');
      return target[key];
    },
    set(target, key, value) {
      console.log('set');
      return (target[key] = value);
    }
  });
}

defineReactiveObserver(wxh);

// 单独拦截数组
wxh.colors.push('green');
wxh.colors[3] = 'orange';
console.log(wxh.colors);
