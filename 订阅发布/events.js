// 封装 EventEmitter
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 注册事件订阅行为（类型，回调函数）
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(callback);
  }
  // 发布事件(类型，参数)
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((callback) => {
        callback(...args);
      });
    }
  }
  // 移除某个事件的一个订阅行为 (类型，回调函数)
  off(type, callback) {
    if (this.events[type]) {
      const index = this.events[type].findIndex((item) => item === callback); // 找到
      if (index !== -1) {
        this.events[type].splice(index, 1);
      }
      if (this.events[type].length === 0) {
        delete this.events[type];
      }
    }
  }
  // 移除某个事件的所有订阅行为
  offAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}
// 创建事件管理器实例
const events = new EventEmitter();

// 注册一个事件监听者
events.on("bilibili", function () {
  console.log("我订阅了 bilibili");
});
// 发布事件
events.emit("bilibili");

// emit传递参数
events.on("DaV", function (name, address) {
  console.log(`我订阅了DaV ${name} - ${address}`);
});
events.emit("DaV", "王小花", "外星人研究学院");

// 移除事件监听
const removedListener = function () {
  console.log("我是一个可以被移除的监听者");
};

events.on("removeTest", removedListener);
events.emit("removeTest");
events.off("removeTest", removedListener);

// 此时事件监听已经被移除，不会再有console.log打印出来了
events.emit("removeTest");

// 移除 bilibili 的所有事件监听
events.offAll("bilibili");

// 此时可以看到events.listeners已经变成空对象了，再emit发送bilibili事件也不会有反应了
console.log(events);

// 观察者
class Observer {
  /**
   * 构造器
   * @param {Function} cb 回调函数，收到目标对象通知时执行
   */
  constructor(cb) {
    if (typeof cb === "function") {
      this.cb = cb;
    } else {
      throw new Error("Observer构造器必须传入函数类型！");
    }
  }
  /**
   * 被目标对象通知时执行
   */
  update() {
    this.cb();
  }
}

// 目标对象
class Subject {
  constructor() {
    // 维护观察者列表
    this.observerList = [];
  }
  /**
   * 添加一个观察者
   * @param {Observer} observer Observer实例
   */
  addObserver(observer) {
    this.observerList.push(observer);
  }
  /**
   * 通知所有的观察者
   */
  notify() {
    this.observerList.forEach((observer) => {
      observer.update();
    });
  }
}

const observerCallback = function () {
  console.log("我被通知了");
};
const observer = new Observer(observerCallback);

const subject = new Subject();
subject.addObserver(observer);
subject.notify();
