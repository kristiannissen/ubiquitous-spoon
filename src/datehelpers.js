/**
 * @file src/datehelpers.js
 */

// Add number of days
export const addDays = (dateStr, days) => {
  let date = new Date(Date.parse(dateStr));
  date.setDate(date.getDate() + days);
  return date;
};

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Check if day is Sun or Sat
const isWeekend = date => [0, 6].includes(date.getDay());

const isToday = date => new Date().getDate() == date.getDate();
