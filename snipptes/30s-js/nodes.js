/**
 * tips: atob
 * @param {*} str
 * @returns
 */
const atob = (str) => Buffer.from(str, "base64").toString("binary");
console.log(atob("Zm9vYmFy"));

/**
 * tips: btoa
 * @param {*} str
 * @returns
 */
const btoa = (str) => Buffer.from(str, "binary").toString("base64");
console.log(btoa("foobar"));

/**
 * tips: 清缓存
 * @param {*} module
 * @returns
 */
const requireUncached = (module) => {
  delete require.cache[require.resolve(module)];
  return require(module);
};
// const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time
