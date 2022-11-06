'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const pages = {
    prefectures: require('../functions/posts'),
    population: require('../functions/post'),
    docs: require('../functions/docs')
}

router.get('/posts', pages.prefectures);
router.get('/post/:prefCode', pages.population);
router.get('/docs', pages.docs);

app.use('/.netlify/functions/server', router);
/*
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<link rel="stylsheet" type="text/css" href="/public/css/main.css">')
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
*/
//static
/*const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))*/


//css
app.get('/css/main.css' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'css', 'main.css'))
})

//pages docs
const wiki = require("../pages/docs.js");
app.use("/pages/docs", wiki);

module.exports = app;
module.exports.handler = serverless(app);