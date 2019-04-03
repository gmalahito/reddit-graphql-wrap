import React from 'react';
import './SubredditPostItem.css';

const SubredditPostItem = props => (
  <li key={props.id} className="subreddit__posts__item">
    <div className="subreddit__posts__item__title">
      {props.title}
    </div>
    <div className="subreddit__posts__item__footer">
     <span className="subreddit__posts__item__score">({props.score})</span>
     <a href={props.url}>visit post</a>
    </div>
  </li>
);

export default SubredditPostItem;