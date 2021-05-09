const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');


//implement apollo server and apply it to the express server
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// create a new Apollo server and pass in our schema data

// integrate our Apollo server with the Express application as middleware
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
  typeDefs,
  resolvers
  // context:authMiddleware
});

const app = express();
const PORT = process.env.PORT || 3001;
server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  }
    );
});
