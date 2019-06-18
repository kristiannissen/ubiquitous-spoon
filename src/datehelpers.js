/**
 * @file src/datehelpers.js
 */

/**
 * @param {date} - A date object
 * @return {number} - Week number
 */
export const weekNumber = date => {
  let newDate = date;
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  let startOfYear = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  let weekNumber = Math.ceil(((newDate - startOfYear) / 86400000 + 1) / 7);
  return weekNumber;
};

/**
 * @param {date} - A date object
 * @param {date} - A date object
 * @return {number} - Number of weeks between first and second date
 */
export const weekDiff = (first, second) => {
  let diff = (second.getTime() - first.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
};

/**
 * @param {number} - A month number 0-11
 * @return {string} - Name of month
 */
export const getMonthName = month =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][month];

/**
 * @param {array} - Array of date objects
 * @return {array} - Array of months
 */
export const months = dates => {
  let months = [];
  dates.forEach(date => {
    if (months.includes(date.getMonth()) === false) {
      months.push(date.getMonth());
    }
  });
  return months;
};
//TODO: Handle Invalid Date exception
export const addMonths = (date, months) => {
  let newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};
/**
 * @param {object} first - A Date object
 * @param {object} second - A Date object
 * @return {array} - An array of month numbers
 */
export const monthsBetween = (first, second) => {
  let months = [],
    currentDate = first;
  while (currentDate <= second) {
    months.push(currentDate.getMonth());
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};

export const formatDate = date =>
  new Date(Date.parse(date)).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

export const dayDiff = (first, second) =>
  Math.round((second - first) / (1000 * 60 * 60 * 24));

export const addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const datesBetween = (first, second) => {
  let dates = [],
    currentDate = first;
  while (currentDate <= second) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};
