'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(`<style type="text/css">
    body {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }
    .api {
        background-image: url('/assets/images/hero.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #444;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .api__title {
        font-size: 40px;
        color: white;
    }
    </style>`)
    res.write('<div class="api"><h1 class="api__title">Hello from Express.js!</h1></div>')
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }))
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

module.exports = app;
module.exports.handler = serverless(app);