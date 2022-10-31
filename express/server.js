'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

//const clanky = require('../json/clanky.json')
//const clankyDemo = require('../json/clanky-demo.json')

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }))
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

//clanky
app.get('/clanky', (req, res) => {
    const clanky = require('../json/clanky.json')
    res.json(clanky)
})

app.get('/clanky-demo', (req, res) => {
    const clanky = require('../json/clanky-demo.json')
    res.json(clanky)
})

module.exports = app;
module.exports.handler = serverless(app);