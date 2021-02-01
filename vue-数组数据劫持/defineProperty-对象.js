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

function observer(data) {
  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
}

observer(wxh);

// wxh.name = '测试';
// console.log(wxh.name);

// 多级对象-递归一下
// wxh.hobby.one = 'lasi';
// console.log(wxh.hobby.one);
