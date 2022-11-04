'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const router = express.Router();

const posts = require('./posts')
const post = require('./post')

// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

// use react_workshop routes
// router.use("/", react_workshop);

// use studify routes
// router.use("/", studify);

app.use('/.netlify/functions/server', posts);  // path must route to lambda
app.use('/.netlify/functions/server', post);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
