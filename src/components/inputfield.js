/**
 * @file src/components/inputfield.js
 */
import React, { useState, useEffect, useRef } from "react";

const InputField = props => {
  let attributes = {
    name: props.name,
    type: props.type || "text",
    id: `id_${props.name}`
  };
  const [val, setValue] = useState(props.value);
  useEffect(() => props.onChange({ name: props.name, value: val }), [val]);

  const divEl = useRef(null);

  return (
    <div
      ref={divEl}
      className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded mdl-cell mdl-cell--12-col"
    >
      <input
        className="mdl-textfield__input"
        {...attributes}
        value={val}
        onChange={e => setValue(e.target.value)}
        onFocus={() => divEl.current.classList.add("is-focused")}
        onBlur={() => divEl.current.classList.remove("is-focused")}
      />
      <label className="mdl-textfield__label" htmlFor={`id_${props.name}`}>
        {props.label}
      </label>
      <span className="mdl-textfield__error">Input is not a number</span>
    </div>
  );
};

export default InputField;
