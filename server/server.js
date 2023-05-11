const express = require('express');
const path = require('path');
const db = require('./config/connection');
// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas'); //keep
const db = require('./config/connection'); //keep

const PORT = process.env.PORT || 3001; //update for Apollo Server
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false })); //updated to false
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); //keep
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

// Call the async function to start the server
startApolloServer();

//complete 5/10/2023