import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
             subreddits{
              title
              url
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        if (this.isActive) {
          this.setState({ events: events, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    return (
      <div>
        Subreddits Categories
      </div>
    );
  }
}

export default App;