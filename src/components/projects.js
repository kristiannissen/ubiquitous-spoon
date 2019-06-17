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

  let dates = dateRange(projects),
    legends = datesBetween(dates[0], dates[dates.length - 1]).map((date, i) => (
      <div key={i} className="legend">
        {dateFormat(date)}
      </div>
    ));

  let projectList = projects
    .sort((a, b) => {
      let dateA = new Date(Date.parse(a.startDate)),
        dateB = new Date(Date.parse(b.startDate));
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    })
    .map((item, indx) => {
      return (
        <div
          key={indx}
          className={`${dayDiff(
            Date.parse(item.startDate),
            Date.parse(item.endDate)
          )} ${dayDiff(dates[0], Date.parse(item.startDate))} `}
        >
          {item.name} {item.startDate} {item.endDate} off{" "}
          {dayDiff(dates[0], Date.parse(item.startDate))}
          dur {dayDiff(Date.parse(item.startDate), Date.parse(item.endDate))}
          add {dateFormat(addDays(Date.parse(item.startDate), 5))}
        </div>
      );
    });

  return (
    <div className="mdl-grid scrollable-content">
      <div className="legends">{legends}</div>
      <div>{projectList}</div>
    </div>
  );
};

const dateFormat = date =>
  new Date(Date.parse(date)).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

const dateRange = dateArr => {
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
