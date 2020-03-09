import React, { useState, useContext } from "react";
import themeContext from '../../context/themeContext'
import "./Story.css";
import Spinner from '../Reusable/Spinner';

const Story = props => {
  const [isExpanded, expand] = useState(false);
  const {dark} = useContext(themeContext);


  const expandStory = e => {
    expand(!isExpanded);
  };

  const deleteClickHandler = e => {
    props.deleteStory(props.id);
  };

  const updateProgressHandler = e => {
    props.cycleProgress(props.id);
  }

  return (
    <div className={!dark ? 'Story' : 'Story Story-dark'}>
      {props.isLoading && <Spinner />}
      <div className="TitleDiv">
        <h2>{props.title}</h2>
        <div className="ProgressTag" onClick={updateProgressHandler}>{props.progressTag}</div>
      </div>
      <div
        className="Description"
        style={isExpanded ? { height: "170px" } : { height: "45px" }}
      >
        <div>{`${props.description} `}</div>{" "}
        <div className="buttons">
          <i className="fas fa-edit" onClick={() => props.editStory(props.id)}></i>
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
