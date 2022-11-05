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
        min-width: 100vw;
        min-height: 100vh;
        margin: 0;
    }

    .o-header {
        position: absolute;
        width: 100%;
        height: 40px;
        top: 0;
        left: 0;
        right: 0;
    }

    .m-nav {
        width: 100%;
        max-width: 1000px;
    }

    .m-nav__items {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .m-nav__item {
        padding: 5px 10px;
    }

    .m-nav__link {
        color: black;
        padding: 5px;
        font-size: 16px;
        line-height: 20px;
    }

    .o-hero {
        background-image: url('/assets/images/hero.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #444;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .o-hero__title {
        font-size: 40px;
        color: white;
        text-align: center;
    }
    .o-hero__title-api {
        font-size: 60px;
        color: white;
    }
    </style>`)
    res.write(`
    <header class="o-header">
        <nav class="m-nav">
            <ul class="m-nav__items">
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