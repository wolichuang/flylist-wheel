/*
 * @Description: 
 * @Author: Chuang Li
 * @Date: 2021-07-19 16:03:14
 * @LastEditTime: 2021-07-31 21:13:56
 * @LastEditors: Chuang Li
 */
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456
console.log(a,b)


var obj = {}; 
console.log(delete obj.p)