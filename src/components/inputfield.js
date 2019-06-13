/**
 * @file src/components/inputfield.js
 */
import React, { useState, useEffect } from "react";

const InputField = props => {
  let attributes = {
    name: props.name,
    type: props.type || "text",
    id: `id_${props.name}`
  };
  const [val, setValue] = useState(props.value);
  useEffect(() => props.onChange({ [props.name]: val }));

  return (
    <div className="mdl-textfield mdl-js-textfield is-upgraded is-focused mdl-cell mdl-cell--col-8">
      <input
        className="mdl-textfield__input"
        {...attributes}
        value={val}
        onChange={e => setValue(e.target.value)}
      />
      <label className="mdl-textfield__label" htmlFor={`id_${props.name}`}>
        {props.label}
      </label>
      <span className="mdl-textfield__error">Input is not a number</span>
    </div>
  );
};

export default InputField;
