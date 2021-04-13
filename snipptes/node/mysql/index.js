const { dbUtils } = require('./dbUtils');

// 增
const paramsInsert = ['wxh', '15210001000', '40'];
dbUtils(
  'INSERT INTO tab_users(username,phone,age) values (?,?,?)',
  paramsInsert
)
  .then((res) => {
    const result = res;
    console.log('INSERT ID:', result);
  })
  .catch((err) => console.log(err));
// 删
const paramsDel = [0];
dbUtils('DELETE FROM tab_users WHERE id=?', paramsDel)
  .then((res) => {
    const result = res;
    console.log('DELETE ID:', result);
  })
  .catch((err) => console.log(err));
// 改
const paramsUpdate = ['wxh', '15210001000', '43', 0];
dbUtils(
  'UPDATE tab_users SET username=?,phone=?,age=? WHERE id=?',
  paramsUpdate
)
  .then((res) => {
    const result = res;
    console.log('UPDATE ID:', result);
  })
  .catch((err) => console.log(err));
// 查
dbUtils('SELECT * FROM tab_users')
  .then((res) => {
    const result = res;
    console.log(result);
  })
  .catch((err) => console.log(err));
