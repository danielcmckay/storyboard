import React, { useState } from "react";
import "./Story.css";

const Story = props => {
  const [isExpanded, expand] = useState(false);

  const expandStory = e => {
    expand(!isExpanded);
  };

  const deleteClickHandler = e => {
    props.deleteStory(props.id);
  };

  return (
    <div className="Story">
      <div className="TitleDiv">
        <h2>{props.title}</h2>
        <div className="ProgressTag">{props.progressTag}</div>
      </div>
      <div
        className="Description"
        style={isExpanded ? { height: "170px" } : { height: "45px" }}
      >
        <div>{`${props.description} `}</div>{" "}
        <div className="buttons">
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash-alt" onClick={deleteClickHandler}></i>
          <i
            className={
              !isExpanded ? "fas fa-chevron-down" : "fas fa-chevron-up"
            }
            onClick={expandStory}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Story;
