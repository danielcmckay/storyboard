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


  const getStories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stories/user/${auth.userId}`,
        {
          method: "GET",
          headers: {
            "Authorization": 'Bearer ' + auth.token
          }
        }
      );

      const responseData = await response.json();

      if (responseData.userStories !== undefined) {
        setState(responseData.userStories.reverse());
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
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/stories/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + auth.token
        },
        body: JSON.stringify({
          title: newStory.title,
          description: newStory.description,
          tags: newStory.tags,
          creator: auth.userId,
          progress: newStory.progress
        })
      });

      await response.json();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    getStories();
  };

  const deleteStory = async id => {
    const updatedStories = stories.filter(story => story.id !== id);
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + `/api/stories/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": 'Bearer ' + auth.token
        }
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
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/stories/${id}`, {
        method: "GET",
        headers: {
          "Authorization": 'Bearer ' + auth.token
        }
      });
      toEdit = await response.json();
      setStoryToEdit(toEdit.story);
    } catch (error) {
      console.log(error);
    }
  };

  const submitEditStory = async editedStory => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/api/stories/${editedStory.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + auth.token },
          body: JSON.stringify({
            title: editedStory.title,
            description: editedStory.description,
            creator: editedStory.creator
          })
        }
        
      );
      await response.json();
      getStories();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProgressHandler = async (storyId) => {
    console.log(storyId);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/api/stories/${storyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + auth.token },
          body: JSON.stringify({
            progress: false
          })
        }
        
      );
      await response.json();
      getStories();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(auth.userId !== null) {
      getStories();
    }
    
  }, [auth.userId]);

  return (
    <div className={!dark ? "StoryBoard" : "StoryBoard StoryBoard-dark"}>
      <div className="ContentWrapper">
        <StoriesContainer
          stories={stories}
          deleteStory={deleteStory}
          id="StoryContainer"
          editStory={editStory}
          isLoading={isLoading}
          updateProgress={updateProgressHandler}
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
