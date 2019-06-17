/**
 * @file src/containers/projects.js
 */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { addDays } from "./../datehelpers";

const Projects = props => {
  const [projects, updateProjects] = useState([]);

  useEffect(() => {
    const socket = io();
    if (projects.length == 0) {
      socket.emit("projects");
    }
    socket.on("projects", resp => updateProjects(resp.projects));
  }, [projects]);

  let dates = dateRange(projects);

  let projectDateRange = dates.map((date, i) => {
    return (
      <div key={i} className="mdl-cell mdl-cell--1-col">
        <small>{dateFormat(date)}</small>
      </div>
    );
  });

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
          className={`mdl-cell mdl-cell--${dayDiff(
            Date.parse(item.startDate),
            Date.parse(item.endDate)
          )}-col mld-cell--${dayDiff(
            dates[0],
            Date.parse(item.startDate)
          )}-offset`}
        >
          {item.name} {item.startDate} {item.endDate} off{" "}
          {dayDiff(dates[0], Date.parse(item.startDate))}
          dur {dayDiff(Date.parse(item.startDate), Date.parse(item.endDate))}
        </div>
      );
    });

  return (
    <div className="mdl-grid">
      <div className="mdl-grid mld-cell mdl-cell--12-col">
        {projectDateRange}
      </div>
      <div className="mdl-grid mdl-cell mdl-cell--12-col">{projectList}</div>
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

export default Projects;
