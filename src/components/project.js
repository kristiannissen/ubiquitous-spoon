/**
 * @file src/components/project.js
 */
import React from "react";

import { weekDiff } from "./../datehelpers";

const Project = props => {
  let startDate = new Date(Date.parse(props.startDate)),
    endDate = new Date(Date.parse(props.endDate));

  return (
    <div className="project-component">
      <div>{props.name}</div>
      <div className="project-timeline" />
    </div>
  );
};

export default Project;
