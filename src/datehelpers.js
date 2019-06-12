/**
 * @file src/datehelpers.js
 */

// Add number of days
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Check if day is Sun or Sat
const isWeekend = date => [0, 6].includes(date.getDay());

const isToday = date => new Date().getDate() == date.getDate();
