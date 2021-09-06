let str = 'ss15270992345ddddd';
console.log(/\d{11}/.exec(str));
let url = 'type=webgl&v=1.0&ak=g24pnuVWETmBprjp2t0gGs0jLocv1kkr';
let reg = /(\w+)=(\w+)/g;
console.log(url.math(reg));