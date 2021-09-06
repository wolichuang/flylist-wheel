/**
 * tips： 封装promise
 */
const promisify = (func) => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log("Hi!")); // Promise resolves after 2s

/**
 * tips: 封装 requestAnimationFrame
 */
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = false,
    raf;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};
// const cb = () => console.log("Animation frame fired");
// const recorder = recordAnimationFrames(cb);
// // logs 'Animation frame fired' on each animation frame
// recorder.stop(); // stops logging
// recorder.start(); // starts again
// const recorder2 = recordAnimationFrames(cb, false);
// // `start` needs to be explicitly called to begin recording frames

/**
 * tips  多个promise执行顺序
 * @param {*} ps
 * @returns
 */
const runPromisesInSeries = (ps) =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise((r) => setTimeout(r, d));
// runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// Executes each promise sequentially, taking a total of 3 seconds to complete
