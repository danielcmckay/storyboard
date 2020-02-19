import React from "react";

import Story from "../Story/Story";

import "./StoriesContainer.css";

const StoriesContainer = props => {
  return (
    <div className="StoriesContainer">
      <h1>My Stories</h1>
      {props.stories.length === 0 ? <p>Looks like you don't have any stories yet.</p> : props.stories.map(story => (
        <Story
          title={story.title}
          id={story.id}
          description={story.description}
          key={story.id}
          tags={story.tags}
          deleteStory={props.deleteStory}
          progressTag={props.progressTag}
        />
      ))}
    </div>
  );
};

export default StoriesContainer;
