/**
 * @file src/components/project.js
 */
import React from "react";

import { weekDiff } from "./../datehelpers";

const Project = props => {
  let startDate = new Date(Date.parse(props.startDate)),
    endDate = new Date(Date.parse(props.endDate)),
    id = `id_${props._id}`;

  return (
    <div className="project-component">
      <div>{props.name}</div>
      <div
        className="project-timeline"
        style={{ backgroundColor: props.color }}
      />
    </div>
  );
};

export default Project;
