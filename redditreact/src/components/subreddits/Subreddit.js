import React, { Component } from 'react';
import SubredditItem from './SubredditItem'
class Subreddit extends Component {
  state = {
    subreddits : [],
    isLoading: false
  }

  componentDidMount() {
    this.fetchData();
  }

  selectHandler = id => {
    const subreddit = this.state.subreddits.find(e => e.id === id);
    this.props.onSelect(subreddit);
  };

  fetchData() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
             subreddits (limit:100){
              id
              title
              url
            }
          }
        `
    };

    fetch('http://localhost:8081/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(response => {
      const subreddits = response.data.subreddits;
      this.setState({ subreddits: subreddits !== null ? subreddits : [], isLoading: false });
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
      const subreddits = this.state.subreddits.map(subreddit => {
        return (
          <SubredditItem
            key={subreddit.id}
            id={subreddit.id}
            title={subreddit.title}
            url={subreddit.url}
            onSelect={this.selectHandler}
          />
        );
      });

      return <ul className="subreddit__list">{subreddits}</ul>;
  }
}

export default Subreddit;