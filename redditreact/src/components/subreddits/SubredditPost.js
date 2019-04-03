import React, { Component } from 'react';
import SubredditPostItem from './SubredditPostItem'
class SubredditPost extends Component {
  state = {
    posts : [],
    category : null,
    search : null,
    isLoading: false
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      category: this.props.category,
      search: this.props.search
    }))
    this.fetchData();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.category, this.props.category);
    if(nextProps.category !== this.state.category){
       this.setState(prevState => ({
        ...prevState,
        category: nextProps.category
      }), () => {
          this.fetchData();
      });
    }
    if(nextProps.search.trim() !== '' || nextProps.search !== null ){
       this.setState(prevState => ({
        ...prevState,
        search: nextProps.search
      }), () => {
          this.fetchData();
      });
    }
  }

  fetchData() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
             posts (subreddit:"${this.props.subreddit === null ? '' : this.props.subreddit.url}",
                    category:"${this.state.category === null ? '' : this.state.category}",
                    search:"${this.state.search === null ? '' : this.state.search}",
                    limit:100,
             ){
              id
              title
              score
              url
              subreddit_name_prefixed
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
      const posts = response.data.posts;
      this.setState({ posts: posts !== null ? posts : [], isLoading: false });
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    const posts = this.state.posts.map(post => {
        return (
          <SubredditPostItem
            key={post.id}
            id={post.id}
            title={post.title}
            url={post.url}
            score={post.score}
            onSelect={this.selectHandler}
          />
        );
      });

      return (
        <div>
        <ul className="subreddit__posts">{posts}</ul>
        </div>
      );
  }
}

export default SubredditPost;