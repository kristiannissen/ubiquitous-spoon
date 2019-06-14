/**
 * @file form.js
 */
import React, { useReducer } from "react";

import InputField from "./inputfield";

const reducer = (state, action) => {
  // console.log("reducer", state, action)
  switch (action.type) {
    default:
      return state;
    case "change":
      // console.log({...state, [action.name]: action.value})
      return {
        ...state,
        [action.name]: action.value
      };
  }
};

const Form = props => {
  //Prep initialState from props
  let initialState = Object.keys(props.fields).reduce((obj, item) => {
    //FIXME: should have default value from props
    obj[item] = props.fields[item].value;
    return obj;
  }, {});
  //Create reducer
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const submitHandler = () => console.log("change", state, initialState);

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
