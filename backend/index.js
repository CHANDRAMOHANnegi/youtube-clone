const express = require('express');
const bodyParser = require('body-parser')
const path = require("path");
const cors = require('cors')

const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/auth');
const app = express();
require('./src/database/connecton');
// require('./src/bootstrap')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(isAuth);
app.use(cors())

app.use('/api', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}));

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));
  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
};

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});