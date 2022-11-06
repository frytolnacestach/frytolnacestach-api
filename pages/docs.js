import express from "express";

const app =  express();

exports.handler = async (event, context) => {
    
    const pageBody = `
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