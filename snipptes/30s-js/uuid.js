/*
 * @Description: 
 * @Author: Chuang Li
 * @Date: 2021-01-27 10:25:28
 * @LastEditTime: 2021-09-06 15:33:30
 * @LastEditors: Chuang Li
 */
const crypto = require('crypto');

/**
 * title: UUIDGeneratorNode
tags: node,random,intermediate
 * @returns
 */
const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
console.log(UUIDGeneratorNode());
console.log('==================');

/**
 * title: UUIDGeneratorBrowser
tags: browser,random,intermediate
 * @returns
 */
// <script src="cryptojs/rollups/hmac-sha1.js"></script>
// <script src="cryptojs/components/enc-base64-min.js"></script>
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (CryptoJS.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
// console.log(UUIDGeneratorBrowser());
console.log('==================');


const guid = () => {
  let d = new Date().getTime();
  let uuid = 'xxxxxx-xxxx-4x-xxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d/16)
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  })
  return uuid;
}

console.log("随机日期数",guid())