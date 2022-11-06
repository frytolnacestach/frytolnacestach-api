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
    res.write('<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>')
    res.write('<script src="/public/js/js_m-hamburger.js" type="text/javascript"></script>')
    res.write('<script src="/public/js/js_o-cookies-dialog.js" type="text/javascript"></script>')
    res.write(`
    <header class="t-header">
    <div class="o-header">
        <div class="o-header__outer">
            <div class="o-header__inner">
                <div class="o-header__nav">
                    <nav class="m-nav-main">
                        <div class="m-nav-main__outer">
                            <div class="m-nav-main__inner">
                                <ul class="m-nav-main__items">
                                    <li class="m-nav-main__item">
                                        <a class="m-nav-main__link" href="/pages/docs">Dokumentace</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="m-logotype">
    <div class="m-logotype__image">
        <div class="m-logotype__image-file">
            <a class="m-logotype__image-link" href="/"></a>
        </div>
    </div>
    <div class="m-logotype__text">
        <span class="m-logotype__text-main">API</span>
        <span class="m-logotype__text-sub">Frytol na cestách</span>
    </div>
</div>
<span class="js_m-hamburger m-hamburger" data-hamburger="close">
    <span class="m-hamburger__texts">
        <span class="m-hamburger__text m-hamburger__text--open">Menu</span>
        <span class="m-hamburger__text m-hamburger__text--close">Zavřít</span>
    </span>
    <span class="m-hamburger__lines">
        <span class="m-hamburger__line m-hamburger__line--1"></span>
        <span class="m-hamburger__line m-hamburger__line--2"></span>
        <span class="m-hamburger__line m-hamburger__line--3"></span>
    </span>
</span>

<div class="o-hero-big">
    <div class="o-hero-big__outer">
        <div class="o-hero-big__inner">
            <h1 class="o-hero-big__headline">
                API
            </h1>
            <p class="o-hero-big__perex">Frytol na cestách</p>
        </div>
    </div>
</div>

<section class="t-section">

</section>

<footer class="t-footer">
    <div class="o-footer">
        <div class="o-footer__nav">
            <nav class="m-nav-footer">
                <div class="m-nav-footer__outer">
                    <div class="m-nav-footer__inner">
                        <ul class="m-nav-footer__items">
                            <li class="m-nav-footer__item">
                                <a class="m-nav-footer__link" href="/">Úvod</a>
                            </li>
                            <li class="m-nav-footer__item">
                                <a class="m-nav-footer__link" href="/pages/docs">Dokumentace</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="o-footer__copyright">
            <div class="o-copyright">
                <div class="o-copyright__outer">
                    <div class="o-copyright__inner">
                        <span class="o-copyright__text">&copy; Všechna práva vyhrazena Frytol na cestách</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>`)
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