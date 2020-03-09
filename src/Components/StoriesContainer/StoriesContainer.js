import React, {useContext} from "react";
import themeContext from '../../context/themeContext';

import Story from "../Story/Story";

import "./StoriesContainer.css";

const StoriesContainer = props => {
  const {dark} = useContext(themeContext);

  return (
    <div className={!dark ? 'StoriesContainer' : "StoriesContainer StoriesContainer-dark"}>
      <h1>My Stories</h1>
      
      {props.stories.length === 0 ? <p>Looks like you don't have any stories yet.</p> : props.stories.reverse().map(story => (
        <Story
          title={story.title}
          id={story.id}
          description={story.description}
          key={story.id}
          tags={story.tags}
          deleteStory={props.deleteStory}
          progressTag={props.progressTag}
          editStory={props.editStory}
          cycleProgress={props.cycleProgress}
          isLoading={props.isLoading}

        />
      ))}
    </div>
  );
};

export default StoriesContainer;
