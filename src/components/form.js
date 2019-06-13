/**
 * @file form.js
 */
import React, { useState, useReducer } from "react";

import InputField from "./inputfield";

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const Form = props => {
  let initialState = Object.keys(props.fields).map(key => {
    return { [key]: props.fields[key].value };
  });
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = data => console.log(data);
  let children = Object.keys(props.fields).map((key, index) => {
    let attr = props.fields[key];
    return <InputField key={index} name={key} {...attr} onChange={onChange} />;
  });

  const submitHandler = () => console.log("Hello Kitty");

  return (
    <form className="mdl-grid" onSubmit={e => e.preventDefault()}>
      {children}
      <div>
        <button
          onClick={() => submitHandler()}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          Save
        </button>
        <button
          onClick={() => console.log("Cancel")}
          className="mdl-button mdl-js-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
