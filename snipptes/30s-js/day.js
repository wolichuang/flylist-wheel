/**
 * tips: 获取时间
 */
const getColonTimeFromDate = (date) => date.toTimeString().slice(0, 8);
console.log("获取时间", getColonTimeFromDate(new Date()));
console.log("======================");

/**
title: addDaysToDate
tags: date,intermediate
 */
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};
console.log(addDaysToDate("2020-10-15", 10)); // '2020-10-25'
console.log(addDaysToDate("2020-10-15", -10)); // '2020-10-05'
console.log("======================");
/**
 * title: addMinutesToDate
tags: date,intermediate
 */

const addMinutesToDate = (date, n) => {
  var d = new Date(date);
  d.setTime(d.getTime() + n * 60 * 1000); // 小时转换 秒  n  * 60 * 1000
  return d.toISOString().split(".")[0].replace("T", " ");
};
console.log(addMinutesToDate("2020-10-19 12:00:00", 10)); // '2020-10-19 12:10:00'
console.log(addMinutesToDate("2020-10-19", -10)); // '2020-10-18 23:50:00')
console.log("======================");

/**
 * tips: 添加5天是周几
 */
const addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce((date) => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);

console.log("tips: 添加5天是周几", addWeekDays(new Date("Oct 09, 2020"), 5)); // 'Oct 15, 2020'
console.log("tips: 添加5天是周几", addWeekDays(new Date("Oct 12, 2020"), 5)); // 'Oct 18, 2020')
console.log("======================");

/**
 * tips: 昨天
 */
const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};
console.log("tips: 昨天", yesterday());
console.log("======================");

/**
 * tips: 获取周几
 */
const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: "long" });
console.log("tips: 获取周几", dayName(new Date()));
console.log("======================");

/**
 * tips: 获取当前日期是一年中的第几天
 */
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
console.log("tips: 获取当前日期是一年中的第几天", dayOfYear(new Date()));
console.log("======================");

/**
 * tips: 5天后的日期
 */
const daysFromNow = (n) => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split("T")[0];
};
console.log("tips: 5天后的日期", daysFromNow(5));
console.log("======================");

/**
 * tips: 获取两个日期之间的值
 */
const countWeekDaysBetween = (startDate, endDate) =>
  Array.from({
    length: (endDate - startDate) / (24 * 3600 * 1000),
  }).reduce((count) => {
    if (startDate.getDay() % 6 !== 0) count++;
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    return count;
  }, 0);
console.log(
  "tips: 获取两个日期之间的值",
  countWeekDaysBetween(new Date("Oct 05, 2020"), new Date("Oct 14, 2020"))
);

const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

console.log(
  getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22"))
); // 9
console.log("======================");

/**
 * tips: 时间搓转日期
 */
const fromTimestamp = (timestamp) => new Date(timestamp * 1000);
console.log("时间戳转日期", fromTimestamp(1602162242));
console.log("======================");

/**
 * tips: 时间戳
 */
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
console.log("时间戳", getTimestamp());
console.log("======================");

/**
 * tips: 判断是上午、下午
 */
const getMeridiemSuffixOfInteger = (num) =>
  num === 0 || num === 24
    ? 12 + "am"
    : num === 12
    ? 12 + "pm"
    : num < 12
    ? (num % 12) + "am"
    : (num % 12) + "pm";
console.log("判断上午、下午", getMeridiemSuffixOfInteger(11));
console.log("======================");

/**
 * tips: 判断是周末
 */
const isWeekend = (d = new Date()) => d.getDay() % 6 === 0;
const isWeekday = (d = new Date()) => d.getDay() % 6 !== 0;
console.log("判断是周末", isWeekend());
console.log("======================");

/**
 * tips: 是否是相同的时间
 */
const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();
console.log(
  "是否是相同的时间",
  isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20))
);

/**
 * tips: 是否是 iso 日期字符串
 */
const isISOString = (val) => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
};
console.log("是否是 iso 日期字符串", isISOString("2020-10-12T10:10:10.000Z"));

/**
 * tips: 判断是否是闰年
 */
const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1;
console.log("判断是否是闰年", isLeapYear(2021));

/**
 * tips: 判断月最后一天
 */
const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split("T")[0];
};
console.log("判断月最后一天", lastDateOfMonth(new Date("2021-02-22")));

/**
 * tips: 最小的日期
 */
const minDate = (...dates) => new Date(Math.min(...dates));
const maxDate = (...dates) => new Date(Math.max(...dates));
const sdates = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];
console.log("最小的日期", minDate(...sdates));

// tips 日期-时间格式化
const toISOStringWithTimezone = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};
toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

// tips 日期-明天
const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};
tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

// tips 倒计时
const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

var output = "";
times(5, (i) => (output += i));
console.log(output); // 01234


function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}