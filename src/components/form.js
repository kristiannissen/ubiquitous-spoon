/**
 * @file form.js
 */
import React, { useState, useReducer } from "react";

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    default:
    case "add":
      return state;
  }
};

const Form = props => {
  const [state, dispatch] = useReducer(reducer, Object.assign({}, props));
  //FIXME: Single letter variables are not goooood
  let p = Object.assign(
    {
      callback: (name, value) => dispatch({ type: "add", name, value })
    },
    props
  );

  let children = React.Children.map(props.children, child =>
    React.cloneElement(child, { ...p })
  );

  return (
    <form className="mdl-grid" onSubmit={e => e.preventDefault()}>
      {children}
      <div>
        <button
          onClick={() => dispatch({ type: "create-project" })}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          Save
        </button>
        <button
          onClick={() => dispatch({ type: "cancel" })}
          className="mdl-button mdl-js-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
