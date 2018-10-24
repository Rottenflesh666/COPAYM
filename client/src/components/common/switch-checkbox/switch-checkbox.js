import React from 'react';
import "./switch-checkbox.css";

const SwitchCheckbox = (props) => (
    <div className={`switchCheckbox form-group ${props.additionalStyle}`}>
        <input
            id ={props.id}
            name={props.name}
            type="checkbox"
            value={props.value}
            onChange={props.controlFunc}/>
        <label for={props.id}></label>
    </div>
);

export default SwitchCheckbox;