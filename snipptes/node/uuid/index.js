var UUID = require('uuid');
var sid = UUID.v1();
console.log(sid.replace(/-/g, ''));
console.log(sid.split('-')[0]);
