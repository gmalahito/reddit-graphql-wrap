import React, { Component } from 'react';
import Subreddit from './components/subreddits/Subreddit'
import SubredditPost from './components/subreddits/SubredditPost'
import Header from './components/header/Header'
import './App.css';

class App extends Component {
  state = {
    search: null,
    category: null,
    selectedSubreddit: null
  };

  selectSubredditHandler = subreddit => {
     this.setState(prevState => ({
              ...prevState,
              selectedSubreddit: subreddit
      }))
  };

  searchHandler = search => {
     this.setState(prevState => ({
              ...prevState,
              search: search
      }))
  };


  selectCategoryHandler = category => {
     this.setState(prevState => ({
              ...prevState,
              category: category
      }))
  };

  render() {
    return (
      <div>
        <Header
          subreddit={this.state.selectedSubreddit}
          onCategoryChange={this.selectCategoryHandler}
          onSearch={this.searchHandler}
         />
        <div className="content">
          {
            this.state.selectedSubreddit || this.state.search ?
            <SubredditPost
              subreddit={this.state.selectedSubreddit}
              category={this.state.category}
              search={this.state.search}
            />
            : ''
          }
          {
            !this.state.selectedSubreddit &&
              <Subreddit
                onSelect={this.selectSubredditHandler}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
