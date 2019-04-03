import React, { Component } from 'react';
import './Header.css'
class Header extends Component {
  state = {
    categories:[
          'hot',
          'new',
          'controversial',
          'top',
          'rising'
    ],
    search: null
  }

  handleChange = (event) => {
    this.props.onCategoryChange(event.target.value);
  };

  inputChange = (event) => {
      this.setState({ search: event.target.value });
  };

  submitSearch = () => {
    console.log(this.state.search);
    this.props.onSearch(this.state.search)
  }

  render() {
    const categories = this.state.categories.map((category,idx) =>{
      return (
        <option key={idx} value={category}>{category}</option>
      );
    });
    return (
      <div>
        <div className="subreddit__header">
          <div className="subreddit__header__form">
            <input type="text"  onChange={this.inputChange}/>
            <button type="button" onClick={this.submitSearch}>search</button>
          </div>
          {
            this.props.subreddit  &&
            <div className="subreddit__header__filter">
              <label>sort</label>
              <select onChange={this.handleChange}>
                {categories}
              </select>
            </div>
          }

        </div>
        {
          this.props.subreddit &&
          <div className="subreddit__header__subreddit">
            <h1>{this.props.subreddit.title}</h1>
          </div>
        }

      </div>
    );
  }
}

export default Header;
