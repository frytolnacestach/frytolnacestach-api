'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<link rel="stylesheet" type="text/css" href="/public/css/main.css" />')
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


/*
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname, 'public/css'))
app.use('/js', express.static(__dirname, 'public/js'))
app.use('/img', express.static(__dirname, 'public/img'))
*/


//Pages
/*app.set('views', '/views')
app.set('view engine', 'ejs')


app.get('', (res, req) => {
    req.render('index')
})

app.get('docs', (res, req) => {
    req.render('docs')
})

//Page Index
app.get('', (res, req) => {
    res.sendFile(__dirname + '/pages/index.html')
})

app.get('/', (res, req) => {
    res.sendFile(__dirname + '/pages/index.html')
})

//Page Docs
app.get('/docs', (res, req) => {
    res.sendFile(__dirname + '/pages/docs.html')
})*/



/*
const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))*/

//app.use(express.static(__dirname + '/public'));

//css
/*app.get('/css/main.css' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'css', 'main.css'))
})*/

//pages docs
/*const wiki = require("../pages/docs.js");
app.use("/pages/docs", wiki);
*/