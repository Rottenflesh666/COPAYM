import React from 'react';
/*import "./single-input.css";*/

const SingleInput = (props) => (
  <div className={"form-group"}>
    <label for={props.id} className="form-label">{props.title}</label>
    <input
        id ={props.id}
        required={props.required}
        className={`form-input ${props.additionalStyle}`}
        name={props.name}
        type={props.inputType}
        value={props.value}
        onChange={props.controlFunc}
        placeholder={props.placeholder} />
  </div>
);

export default SingleInput;