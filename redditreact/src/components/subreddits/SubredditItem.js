import React from 'react';
import './SubredditItem.css';

const SubredditItem = props => (
  <li key={props.id} className="subreddit__list__item">
    <p>{props.title}</p>
    <button  type="button" onClick={props.onSelect.bind(this, props.id)}>{props.url}</button>
  </li>
);

export default SubredditItem;