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

function defineReactive(obj, key, value) {
  observer(value); // 递归一下
  Object.defineProperty(obj, key, {
    get() {
      console.log('get');
      return value;
    },
    set(newVal) {
      console.log('set', newVal);
      if (newVal !== value) value = newVal;
    }
  });
}

// 拦截数组, 当我们调用push,pop等方法它是不会触发set钩子的,为什么？
// 因为Object.defineProperty压根就不支持数组的拦截。既然它不支持，
// 那么我们只能拦截它的这些（'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'）改变自身数据的方法了。

function _arrayReactive() {
  const __proto = Array.prototype;
  const _arrayReactive = Object.create(__proto);
  const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];
  methods.forEach((item) => {
    const _original = __proto[item];
    Object.defineProperty(_arrayReactive, item, {
      value: function v(...args) {
        console.log('set arrayReactive');
        return _original.apply(this, args);
      }
    });
  });
  return _arrayReactive;
}
function observer(data) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.__proto__ = _arrayReactive();
    } else {
      Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
    }
  }
}

observer(wxh);

// 单独拦截数组
wxh.colors.push('green');
wxh.colors[3] = 'orange';
console.log(wxh.colors);
