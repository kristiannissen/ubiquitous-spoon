/**
 * @file form.js
 */
import React, { useReducer, useRef, useEffect, useState } from "react";
import io from "socket.io-client";

import InputField from "./inputfield";

const initialState = {
  name: "",
  startDate: "",
  endDate: "",
  _id: null
};

const reducer = (state = initialState, action) => {
  //  console.log("reducer", state, action);
  switch (action.type) {
    default:
      return state;
    case "change":
      // console.log("change", state, action);
      return {
        ...state,
        [action.name]: action.value
      };
    case "edit":
      return {
        ...state,
        name: action.name,
        startDate: action.startDate,
        endDate: action.endDate,
        _id: action._id
      };
    case "reset":
          return initialState
  }
};

const socket = io();

const Form = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    socket.on("project-edit", data => {
      // console.log(data);
      dispatch({ type: "edit", ...data });
    });
  }, []);

  const change = data => dispatch({ type: "change", ...data });
  const submitHandler = () => {
    let id = state._id;
    delete state._id;
    socket.emit("project-update", id, state);
  };
  const formElm = useRef(null);

  return (
    <form
      className="mdl-grid"
      onSubmit={e => e.preventDefault()}
      autoComplete="off"
      ref={formElm}
    >
      <InputField
        name="name"
        label="Enter Name"
        value={state.name}
        onChange={change}
      />
      <InputField
        type="text"
        name="startDate"
        label="Enter Start Date"
        value={state.startDate}
        onChange={change}
      />
      <InputField
        type="text"
        name="endDate"
        label="Enter End Date"
        value={state.endDate}
        onChange={change}
      />
      <div>
        <button
          onClick={() => submitHandler()}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          Save
        </button>
        <button
          onClick={() => dispatch({type: "reset"})}
          className="mdl-button mdl-js-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
