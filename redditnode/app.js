const express = require('express');
const parser = require('body-parser');
const fetch = require("node-fetch");
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const qs = require('qs');

app.use(parser.json()); // for json request body


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const REDDITURL = 'https://api.reddit.com';

const get = (url) =>
  fetch(url, {
    method: 'GET',
}).then(res => res.json())
.catch(err => console.log(err));

// graphql schema
const  schema =  buildSchema(`
  type Post {
    id: String!
    title: String!
    author: String!
    url: String!
    score: Float!
    subreddit_name_prefixed: String!
    subreddit_id
  }

  type Subreddit{
    id: String!
    title: String!
    url: String!
  }

  type RootQuery{
    posts(subreddit: String, category: String, search: String, limit: Int): [Post!]
    subreddits(limit: Int): [Subreddit!]
  }

  schema {
      query: RootQuery
  }
`);

// graphql resolvers
const resolver = {
  posts: (args) => {
    let url = `${REDDITURL}`;
    const {subreddit, category, search, limit} = args;
     console.log(search);
    if(search !== null && search.trim() !== ''){
        url = subreddit ?  `${url}${subreddit}search?${qs.stringify({q:search})}` :  `${url}/search?${qs.stringify({q:search})}`;
    }
    else{
        url =  `${url}${subreddit}${category}`;
    }

    if(limit){
      url = search ? `${url}&limit=${limit}` : `${url}?limit=${limit}`;
    }

    console.log(url);

    return  get(url)
    .then(response => {
      return response.data.children.map(posts => posts.data)
    })
    .catch(err => console.log(err));

  },
  subreddits: (args) => {
    const {limit} = args;
    let url = `${REDDITURL}/subreddits`;


     if(limit){
      url = `${url}?limit=${limit}`;
    }


     console.log(url);

    return get(url)
    .then(response => {

      return response.data.children.map(posts => posts.data)
    });
  },

};

// serve graphql
app.use('/', graphqlHttp({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));


app.listen(
    8081, () => {
        console.log("Express listening on port 8081");
    }
);