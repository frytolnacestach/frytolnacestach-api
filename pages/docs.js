const express = require("express");
const router = express.Router();

const html = `<!DOCTYPE html>
<html lang="cs">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="/public/css/main.css" />

        <title>Dokumentace | API Frytol na cestách</title>

        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="/public/js/js_m-hamburger.js" type="text/javascript"></script>
        <script src="/public/js/js_o-cookies-dialog.js" type="text/javascript"></script>
    </head>
    <body>
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
                        Documentace API
                    </h1>
                </div>
            </div>
        </div>

        <section class="t-section">
            <a href="/.netlify/functions/posts">Všechny příspěvky</a>
            <a href="/.netlify/functions/posts/trikrizovy-vrch">Konkrétní příspěvek</a>
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
        </footer>
    </body>
</html>`

router.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      body: html,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;