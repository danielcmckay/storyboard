import React, { useState, useContext, useEffect } from "react";
import themeContext from '../../context/themeContext'
import "./NewStoryContainer.css";


const NewStoryContainer = props => {
  const [newStory, setStory] = useState({ title: "", description: "", id: "", progress: true });
  const [inEdit, setEdit] = useState(false);

  const handleChange = e => {
    setStory({ ...newStory, [e.target.name]: e.target.value });
  };


  const Submit = e => {
    e.preventDefault();
    props.addStory(newStory);
    setStory({title: "", description: "", id: "", progress: true});
  };


  const editHandler = () => {
    if (props.storyToEdit !== undefined) {
      setStory(props.storyToEdit);
    }
  }

  const submitEditHandler = (e) => {
    e.preventDefault();
    props.submitEditStory(newStory);
    setStory({title: "", description: "", id: "", progress: true});

  }

  useEffect(() => {
    props.storyToEdit !== undefined && setEdit(true);
    editHandler();
   
  }, [props.storyToEdit])
  

  const {dark} = useContext(themeContext);


  return (
    <div className={!dark ? "NewStoryContainer" : "NewStoryContainer NewStoryContainer-dark"}>
      {props.storyToEdit === undefined ? <h2>Create a new story</h2> : <h2>Update story</h2>}
      <form onSubmit={!inEdit ? Submit : submitEditHandler}>
        <input
          onChange={handleChange}
          className={!dark ? "NewStoryInput" : "NewStoryInput NewStoryInput-dark"}
          type="text"
          name="title"
          value={newStory.title}
          placeholder="New story title"
        />
        <input
          onChange={handleChange}
          className={!dark ? "NewStoryInput" : "NewStoryInput NewStoryInput-dark"}
          type="text"
          value={newStory.description}

          name="description"
          placeholder="Description"
        />
        <button type="submit" className="Button">
          {!inEdit ? "Add Story +" : "Update Story"}
        </button>
      </form>
    </div>
  );
};

export default NewStoryContainer;
