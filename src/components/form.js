/**
 * @file form.js
 */
import React, { useReducer } from "react";
import io from "socket.io-client";

import InputField from "./inputfield";

const reducer = (state, action) => {
  // console.log("reducer", state, action)
  switch (action.type) {
    default:
      return state;
    case "change":
      // console.log("change", state, action)
      return {
        ...state,
        [action.name]: action.value
      };
  }
};

const Form = props => {
  //Prep initialState from props
  //TODO: _id can be undefined
  let initialState = Object.keys(props.fields).reduce((obj, item) => {
    obj[item] = props.fields[item].value;
    return obj;
  }, {});
  //Create reducer, overwrite value of _id if it is passed
  const [state, dispatch] = useReducer(
    reducer,
    Object.assign({ _id: "" }, initialState)
  );
  //Value change handler for child component
  const onChangeHandler = data => {
    // console.log(data);
    return dispatch({ type: "change", ...data });
  };
  //Build children components
  let children = Object.keys(props.fields).map((key, index) => {
    let attr = props.fields[key];
    return (
      <InputField key={index} name={key} {...attr} onChange={onChangeHandler} />
    );
  });
  //Form submit handler
  const submitHandler = () => {
    const socket = io();
    socket.emit(props.action, state);
    socket.on(props.action, resp => {
      // console.log("form submithandler", resp)
      dispatch({ type: "change", ...resp });
    });
  };

  return (
    <form className="mdl-grid" onSubmit={e => e.preventDefault()} autoComplete="off">
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
