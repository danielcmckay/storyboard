import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import StoriesContainer from "../StoriesContainer/StoriesContainer";
import NewStoryContainer from "../NewStoryContainer/NewStoryContainer";
import "./StoryBoard.css";

const initialStories = [
  
];

const StoryBoard = () => {
  const [stories, setState] = useState(initialStories);

  const addStory = newStory => {
    console.log(newStory);
    const newStories = [...stories, newStory];
    setState(newStories);
    window.localStorage.setItem('stories', JSON.stringify(newStories))
    // window.localStorage.setItem("stories", JSON.stringify(...stories));
  };

  useEffect(() => {
    if (window.localStorage.getItem("stories")) {

      const lsStories = JSON.parse(window.localStorage.getItem('stories'));
      console.log(lsStories)

      setState(lsStories)
      console.log('USE EFFECT LS', typeof(lsStories));
    } else {
      window.localStorage.setItem("stories", JSON.stringify(stories));
      const lsStories = JSON.parse(window.localStorage.getItem('stories'));
      setState(stories, lsStories)
      console.log("USE EFFECT NEW LS")
    }
  }, []);

  const deleteStory = id => {
    const updatedStories = stories.filter(story => story.id !== id);
    window.localStorage.setItem("stories", JSON.stringify(updatedStories));

    setState(updatedStories);
  };

  return (
    <div className="StoryBoard">
      <Nav />
      <div className="ContentWrapper">
        <StoriesContainer stories={stories} deleteStory={deleteStory} progressTag='In Progress'/>
        <NewStoryContainer addStory={addStory} />
      </div>
    </div>
  );
};

export default StoryBoard;
