'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

//clanky
app.get('/clanky', (req, res) => {
    const clanky = require('../json/clanky.json')
    res.json(clanky)
})

module.exports = app;
module.exports.handler = serverless(app);