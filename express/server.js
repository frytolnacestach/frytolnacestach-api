'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<link rel="stylsheet" type="text/css" href="/public/css/main.css">')
    res.writeHead(200, {'Content-Type': 'text/css'});
    readFile(`/public/css/main.css`, res);
    res.write(`
    <header class="o-header">
        <nav class="m-nav">
            <ul class="m-nav__items">
                <li class="m-nav__item">
                    <a class="m-nav__link" href="/">Úvod</a>
                </li>
                <li class="m-nav__item">
                    <a class="m-nav__link" href="/.netlify/pages/docs">Dokumentace</a>
                </li>
            </ul>
        </nav>
    </header>
    <div class="o-hero">
        <h1 class="o-hero__title">
            <span class="o-hero__title-api">API</span>
            <br>Frytol na cestách
        </h1>
    </div>`)
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }))
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

module.exports = app;
module.exports.handler = serverless(app);