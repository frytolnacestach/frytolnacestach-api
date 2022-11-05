import express from "express";

const app =  express();

exports.handler = async (event, context) => {
    
    
    const pageBody = `
    <style type="text/css">
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
    
    body {
        width: 100%;
        height: auto;
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
        background: rgba(255, 255, 255, .95);
    }
    
    .m-nav {
        width: 100%;
        max-width: 1000px;
    }
    
    .m-nav__items {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 5px 15px;
        list-style: none;
    }
    
    .m-nav__item {
        padding: 5px 10px;
    }
    
    .m-nav__link {
        color: black;
        padding: 5px;
        font-size: 16px;
        line-height: 20px;
        height: 20px;
        text-decoration: none;
        text-transform: uppercase;
    }
    
    .o-hero {
        background-image: url('/public/images/hero.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #444;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
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
    </style>
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
            <span class="o-hero__title-api">Documentace API</span>
            <br>Frytol na cestách
        </h1>
    </div>`
    
    return {
        statusCode: 200,
        body: pageBody
    }
}