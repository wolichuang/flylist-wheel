const fs = require("fs");

/**
 * tips: 是否有dir
 */
const createDirIfNotExists = (dir) =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
createDirIfNotExists("test");

/**
 * tips: 写入json 文件
 */
const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));

JSONToFile({ test: "is passed" }, "testJsonFile");

/**
 * tips: 写入 csv 文件
 */
const JSONtoCSV = (arr, columns, delimiter = ",") =>
  [
    columns.join(delimiter),
    ...arr.map((obj) =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? "" : delimiter}"${!obj[key] ? "" : obj[key]}"`,
        ""
      )
    ),
  ].join("\n");
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ["a", "b"]
);

// tips: 读取数据元素转数组
const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");
let arr = readFileLines("./test/test.txt");
console.log("读取文件元素转数组", arr);
