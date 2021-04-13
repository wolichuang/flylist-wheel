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
