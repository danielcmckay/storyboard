import React, { useState, useEffect, useContext } from "react";
import StoriesContainer from "../StoriesContainer/StoriesContainer";
import NewStoryContainer from "../NewStoryContainer/NewStoryContainer";
import "./StoryBoard.css";
import themeContext from "../../context/themeContext";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../Reusable/Spinner";

const StoryBoard = () => {
  const [stories, setState] = useState([]);
  const { dark } = useContext(themeContext);
  const auth = useContext(AuthContext);
  const [storyToEdit, setStoryToEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getStories();
    console.log('Use effect triggered')
  }, [auth.userId]);

  const getStories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/stories/user/${auth.userId}`,
        {
          method: "GET"
        }
      );

      const responseData = await response.json();

      if (responseData.userStories !== undefined) {
        setState(responseData.userStories);
      }
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const addStory = async newStory => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/stories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newStory.title,
          description: newStory.description,
          tags: newStory.tags,
          creator: auth.userId,
          progress: newStory.progress
        })
      });

      const responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    getStories();
  };

  const deleteStory = async id => {
    const updatedStories = stories.filter(story => story.id !== id);
    try {
      await fetch(`http://localhost:5000/api/stories/${id}`, {
        method: "DELETE"
      });
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setState(updatedStories);
  };

  const editStory = async id => {
    let toEdit;
    try {
      const response = await fetch(`http://localhost:5000/api/stories/${id}`, {
        method: "GET"
      });
      toEdit = await response.json();
      setStoryToEdit(toEdit.story);
    } catch (error) {
      console.log(error);
    }
  };

  // create patch function and pass down to newstorycontainer
  const submitEditStory = async editedStory => {
    console.log(editedStory);
    try {
      const response = await fetch(
        `http://localhost:5000/api/stories/${editedStory.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editedStory.title,
            description: editedStory.description,
            creator: editedStory.creator
          })
        }
        
      );
      console.log(response.body)
      const responseData = await response.json();
      getStories();
      console.log(responseData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={!dark ? "StoryBoard" : "StoryBoard StoryBoard-dark"}>
      <div className="ContentWrapper">
        <StoriesContainer
          stories={stories}
          deleteStory={deleteStory}
          id="StoryContainer"
          editStory={editStory}
          isLoading={isLoading}
        />

        <NewStoryContainer
          addStory={addStory}
          storyToEdit={storyToEdit}
          submitEditStory={submitEditStory}
        >
          {isLoading && <Spinner />}
        </NewStoryContainer>
      </div>
    </div>
  );
};

export default StoryBoard;
