/**
 * tips: 添加多事件监听
 */
const addMultipleListeners = (el, types, callback, options, useCapture) => {
  types.forEach((type) =>
    el.addEventListener(type, callback, options, useCapture)
  );
};

// addMultipleListeners(
//   document.querySelector('.my-element'),
//   ['click', 'mousedown'],
//   () => {
//     console.log('hello!');
//   }
// );

// tips: 事件触发
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
triggerEvent(document.getElementById("myId"), "click", { username: "bob" });
