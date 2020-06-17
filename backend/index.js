const express = require('express');
const bodyParser = require('body-parser')
const path = require("path");
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config('./env');

const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/auth');
const videoRouter = require('./routes/videos');
const app = express();
require('./database/connection/connecton');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(isAuth);
app.use(cors());

app.use((req, res, next) => {
  // console.log(req);
  // res.setHeader('Access-Control-Allow-Origin', "*");
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  // );

  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Authorization'
  // );

  // if (req.method === 'OPTIONS') {
  //   return res.sendStatus(200);
  // }
  next();
});

app.use('/video', videoRouter);

app.use('/api', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  })
}));

app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});