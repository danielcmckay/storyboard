import React, {useContext} from "react";
import themeContext from '../../context/themeContext';
import Spinner from '../Reusable/Spinner';

import Story from "../Story/Story";

import "./StoriesContainer.css";

const StoriesContainer = props => {
  const {dark} = useContext(themeContext);

  return (
    <div className={!dark ? 'StoriesContainer' : "StoriesContainer StoriesContainer-dark"}>

      <h1>My Stories</h1>
      {props.isLoading ? <Spinner /> :
      
      props.stories.length === 0 ? <p>Looks like you don't have any stories yet.</p> : props.stories.map(story => (
        <Story
          title={story.title}
          id={story.id}
          description={story.description}
          key={story.id}
          deleteStory={props.deleteStory}
          progress={props.progress}
          editStory={props.editStory}
          cycleProgress={props.cycleProgress}
          isLoading={props.isLoading}

        />
      ))}

      
    </div>
  );
};

export default StoriesContainer;
