const stringRandom = require('string-random');

module.exports = rdPath = () => stringRandom(16, { numbers: false });
