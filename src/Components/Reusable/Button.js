import React from "react";
import './Button.css';

const Button = (props) => {
  return(
    <div className="Button" onClick={props.click}>{props.children}</div>
  )
}

export default Button;