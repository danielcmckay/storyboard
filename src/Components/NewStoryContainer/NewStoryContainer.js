import React, { useState, useContext } from "react";
import themeContext from '../../context/themeContext'
import "./NewStoryContainer.css";;

const NewStoryContainer = props => {
  const story = { title: "", description: "", id: "", tags: [] };
  const [newStory, setState] = useState(story);
  const [inEdit, setInEdit] = useState();

  const handleChange = e => {
    setState({ ...newStory, [e.target.name]: e.target.value });
  };

  const clearInputs = () => {
    setState({title: "", description: "", id: "", tags: [] });

  }

  // useContext(() => {
  //   if (!props.storyToEdit === undefined) {
  //     setInEdit(true);
  //     setState(props.storyToEdit)
  //   }
  // }, [props.storyToEdit])

  const Submit = e => {
    e.preventDefault();
    props.addStory(newStory);
    setState({title: "", description: "", id: "", tags: [] });
  };

  

  const {dark} = useContext(themeContext);


  return (
    <div className={!dark ? "NewStoryContainer" : "NewStoryContainer NewStoryContainer-dark"}>
      {props.storyToEdit === undefined ? <h2>Create a new story</h2> : <h2>Update story</h2>}
      <form onSubmit={Submit}>
        <input
          onChange={handleChange}
          className={!dark ? "NewStoryInput" : "NewStoryInput NewStoryInput-dark"}
          type="text"
          name="title"
          // defaultValue={!props.isEditing ? story.title : props.storyToEdit[0].title}
          placeholder="New story title"
        />
        <input
          onChange={handleChange}
          className={!dark ? "NewStoryInput" : "NewStoryInput NewStoryInput-dark"}
          type="text"
          name="tags"
          placeholder="New story tags"
        />
        <input
          onChange={handleChange}
          className={!dark ? "NewStoryInput" : "NewStoryInput NewStoryInput-dark"}
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
