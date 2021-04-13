const axios = require('axios');
var api = 'https://api.github.com/repos/';

function init() {
  const url = './config.js';

  if (!getSession('conf')) {
    return axios
      .get(url)
      .then((conf) => {
        console.dir('conf from axios');
        setSession('conf', conf.data);
        global.COURSES = 'xxxxx';
        return conf.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return new Promise(function (resolve, reject) {
      console.dir('conf from ss');
      resolve(getSession('conf'));
    });
  }
}

function setSession(key, val) {
  return sessionStorage.setItem(key, JSON.stringify(val));
}

function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function getIssue() {
  const cfg = global.cfg;
  const url =
    api +
    cfg.repo.user +
    '/' +
    cfg.repo.repo +
    '/issues' +
    '?token=' +
    cfg.repo.read_only_token;
  if (!getSession('res')) {
    return axios
      .get(url)
      .then((res) => {
        console.dir('from axios');
        setSession('res', res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return new Promise(function (resolve, reject) {
      console.dir('from ss');
      resolve(getSession('res'));
    });
  }
}
init();
getIssue();
