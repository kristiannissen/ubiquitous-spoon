/**
 * @file src/containers/projects.js
 */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Projects = props => {
  const [projects, updateProjects] = useState([]);

  useEffect(() => {
    const socket = io();
    if (projects.length == 0) {
      socket.emit("projects");
    }
    socket.on("projects", resp => updateProjects(resp.projects));
  }, [projects]);
  // 2. parameter in addMonths could be a context variable
  let dates = projectDateRange(projects),
    monthRange = monthsBetween(dates[0], addMonths(dates[0], 3)).map(
      (month, indx) => {
        // console.log(month)
        // TODO: Divide range by 12 to use full document width
        let cssCol = 12 / 4;
        console.log(cssCol);
        return (
          <div key={indx} className={`mdl-cell mdl-cell--${cssCol}-col`}>
            {getMonthName(month)}
          </div>
        );
      }
    ),
    gantt = projects.map((project, indx) => {
      let duration = monthsBetween(
          new Date(Date.parse(project.startDate)),
          new Date(Date.parse(project.endDate))
        ),
        offset = monthsBetween(
          dates[0],
          new Date(Date.parse(project.startDate))
        ),
        css = ["mdl-cell", "mdl-cell--stretch"];
      css.push(`mdl-cell--${duration.length}-col`);
      css.push(`mdl-cell--${offset.length - 1}-offset`);
      return (
        <div
          key={indx}
          className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col"
        >
          <div className={css.join(" ")}>
            {project.name} Duration {duration.length}
          </div>
        </div>
      );
    });

  return (
    <div className="mdl-grid mdl-grid--no-spacing">
      <div className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
        {monthRange}
      </div>
      <div className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
        {gantt}
      </div>
    </div>
  );
};

// TODO: Move all of this to datehelper file
// decide on naming, either diff or between

/**
 * @param {date} - A date object
 * @return {number} - Week number
 */
const weekNumber = date => {
  let newDate = date;
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  let startOfYear = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  let weekNumber = Math.ceil(((newDate - startOfYear) / 86400000 + 1) / 7);
  return weekNumber;
};

/**
 * @param {date} - A date object
 * @param {date} - A date object
 * @return {array} - Array of week numbers
 */
const weekDiff = (first, second) => {
  let diff = (second.getTime() - first.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
};

/**
 * @param {number} - A month number 0-11
 * @return {string} - Name of month
 */
const getMonthName = month =>
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

const months = dates => {
  let months = [];
  dates.forEach(date => {
    if (months.includes(date.getMonth()) === false) {
      months.push(date.getMonth());
    }
  });
  return months;
};
//TODO: Handle Invalid Date exception
const addMonths = (date, months) => {
  let newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};
/**
 * @param {object} first - A Date object
 * @param {object} second - A Date object
 * @return {array} - An array of month numbers
 */
const monthsBetween = (first, second) => {
  let months = [],
    currentDate = first;
  while (currentDate <= second) {
    months.push(currentDate.getMonth());
    currentDate = addMonths(currentDate, 1);
  }

  return months;
};

const dateFormat = date =>
  new Date(Date.parse(date)).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

const projectDateRange = dateArr => {
  let dates = [];
  for (let i in dateArr) {
    dates.push(new Date(Date.parse(dateArr[i].startDate)));
    dates.push(new Date(Date.parse(dateArr[i].endDate)));
  }
  return dates.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

const dayDiff = (first, second) =>
  Math.round((second - first) / (1000 * 60 * 60 * 24));

const addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const datesBetween = (first, second) => {
  let dates = [],
    currentDate = first;
  while (currentDate <= second) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

export default Projects;
