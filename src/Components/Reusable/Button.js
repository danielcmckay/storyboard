import React from "react";
import "./Button.css";
import "../Auth/Login.css";

const Button = props => {
  return (
    <button
      className={`Button ${props.classes}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
