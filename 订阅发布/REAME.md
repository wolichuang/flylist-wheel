# 订阅发布

## 是什么

发布订阅模式，是对象间一对多的依赖关系，当一个对象的状态发生改变的时候，所有依赖于它的对象都将得到状态改变的通知。
例如： 在抖音（调度中心）中订阅个抖音号（发布者），当播主有更新的时候，用户（订阅者）会自动收到消息通知。

要实现一个发布订阅模式 ：包含三个部分 事件的发布者、事件的订阅者 和 事件调度中心。发布者和订阅者是松耦合的

1. 发布者： 发布者通过事件调度中心提供的方法(publish) 发布事件。
2. 调度中心：用来注册事件,相当于一个共享资源池。
3. 订阅者：订阅者通过事件调度中心提供的方法(subscribe) 事件订阅

在现实的很多框架中都实现了这种模式

1. jQuery 的事件 on 和 trigger 中封装的方法
2. Nodejs EventEmitter 中的 on 和 emit 方法
3. Vue 中父子组件间的通信 emit() 和 on() 方法

## 实现发布订阅

1. 创建一个对象
2. 在该对象上创建一个缓存列表
3. on 函数用来把函数 callback 都加到缓存列表中（订阅者注册事件到调度中心）
4. emit 函数传 value 值去执行对应缓存列表中的函数
5. off 方法可以根据 callback 值取消订阅（取消订阅）

![](https://user-gold-cdn.xitu.io/2019/12/12/16ef7fe5614d6ea0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
// 封装 eventEmitter
class eventEmitter {
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
```

## Vue 中的实现

有了发布-订阅模式的知识后，我们来看下 Vue 中怎么实现 $on 和 $emit 的方法，直接看源码：

```js
function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // event 为数组时，循环执行 $on
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    // 先绑定，后删除
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all，若没有传参数，清空所有订阅
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events，events 为数组时，循环执行 $off
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      // 没有 cbs 直接 return this
      return vm;
    }
    if (!fn) {
      // 若没有 handler，清空 event 对应的缓存列表
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler，删除相应的 handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      // 传入的 event 区分大小写，若不一致，有提示
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          'Event "' +
            lowerCaseEvent +
            '" is emitted in component ' +
            formatComponentName(vm) +
            ' but the handler is registered for "' +
            event +
            '". ' +
            "Note that HTML attributes are case-insensitive and you cannot use " +
            "v-on to listen to camelCase events when using in-DOM templates. " +
            'You should probably use "' +
            hyphenate(event) +
            '" instead of "' +
            event +
            '".'
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // 只取回调函数，不取 event
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, 'event handler for "' + event + '"');
        }
      }
    }
    return vm;
  };
}

/***
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
```

我们理解了发布订阅模式，通常很多地方都说发布-订阅模式就是观察者模式，但是他们是不同的

## 观察者模式

观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。

1. Subject 它的职能很单一，可以理解为，它只管理一种事件
2. Subject 需要维护自身的观察者数组`observerList`，当自身发生变化时，通过调用自身的`notify`方法，依次通知每一个观察者执行`update`方法。

```js
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
```

## 区别

1. 在观察者模式中，观察者是知道主题的，主题一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

2. 在发布订阅模式中，组件是松散耦合的，观察者模式是相反的。

3. 观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。

4. 观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。

![avatar](https://user-gold-cdn.xitu.io/2019/5/24/16ae7d147841b0b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 总结

发布订阅模式和观察者模式，在工作中经常会遇到，作个记录和归档。

发布订阅模式比观察者模式多了一个中间层，发布者和订阅者都是通过中间层进行通信，而观察者模式没有这个中间层，直接通信了。
