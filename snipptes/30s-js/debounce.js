/**
 * tips: 节流 点击
 */
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
// 点击
window.addEventListener(
  "resize",
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
);
/**
 * tips: 节流 promise
 */
const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.length = 0;
        Promise.resolve(fn.apply(this, args)).then(
          (data) => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          (error) => {
            currentPending.forEach(({ reject }) => reject(error));
          }
        );
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
};

const fn = (arg) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000, ["resolved", arg]);
  });
const debounced = debouncePromise(fn, 200);
debounced("foo").then(console.log);
debounced("bar").then(console.log);

// 防抖
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

window.addEventListener(
  "resize",
  throttle(function (evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
