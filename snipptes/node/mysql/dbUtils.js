const mysql = require('mysql');
// 数据库配置
const dbConfig = {
  mysqls: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'flylist'
  }
};

const pool = mysql.createPool(dbConfig.mysqls); // 数据库链

exports.dbUtils = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
