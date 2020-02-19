import React, { useState } from "react";
import "./NewStoryContainer.css";
import uuid from "uuid/v4";

const NewStoryContainer = props => {
  const story = { title: "", description: "", id: "", tags: [] };
  const [newStory, setState] = useState(story);

  const handleChange = e => {
    setState({ ...newStory, id: uuid(), [e.target.name]: e.target.value });
  };


  const Submit = e => {
    e.preventDefault();
    setState({ ...newStory, id: uuid() });
    props.addStory(newStory);
  };

  return (
    <div className="NewStoryContainer">
      <h2>Create a new story</h2>
      <form onSubmit={Submit}>
        <input
          onChange={handleChange}
          className="NewStoryInput"
          type="text"
          name="title"
          placeholder="New story title"
        />
        <input
          onChange={handleChange}
          className="NewStoryInput"
          type="text"
          name="tags"
          placeholder="New story tags"
        />
        <input
          onChange={handleChange}
          className="NewStoryInput"
          type="text"
          name="description"
          placeholder="Description"
        />
        <button type="submit" className="Button">
          Add Story +
        </button>
      </form>
    </div>
  );
};

export default NewStoryContainer;
