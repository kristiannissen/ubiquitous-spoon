/**
 * @file src/components/inputfield.js
 */
import React, { useEffect, useRef } from "react";

const InputField = props => {
  let attributes = {
    name: props.name,
    type: props.type || "text",
    id: `id_${props.name}`
  };

  const divEl = useRef(null);
  useEffect(() => {
    if (props.name !== "") {
      divEl.current.classList.add("is-dirty");
    }
  }, []);

  return (
    <div
      ref={divEl}
      className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded mdl-cell mdl-cell--12-col"
    >
      <input
        className="mdl-textfield__input"
        {...attributes}
        value={props.value}
        onChange={e =>
          props.onChange({ name: e.target.name, value: e.target.value })
        }
        onFocus={() => divEl.current.classList.add("is-focused")}
        onBlur={() => divEl.current.classList.remove("is-focused")}
      />
      <label className="mdl-textfield__label" htmlFor={`id_${props.name}`}>
        {props.label}
      </label>
    </div>
  );
};

export default InputField;
