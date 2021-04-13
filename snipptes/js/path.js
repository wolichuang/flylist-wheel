/**
 * 
 * ---
title: untildify
tags: node,string,beginner
---
 * @returns
 */
const untildify = (str) =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

console.log(untildify('~/node'));
console.log('====================');
