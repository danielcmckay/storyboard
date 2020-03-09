import React from 'react';
import './ErrorModal.css';

const ErrorModal = (props) => {
  return (
    <div className="ErrorModal">
      {props.message}
    </div>
  )
}

export default ErrorModal

