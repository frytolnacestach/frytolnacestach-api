import express from "express";

const app =  express();

exports.handler = async (event, context) => {
    
    
    const html = `<style type="text/css">
    body {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }
    .api {
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
    
    .api__title {
        font-size: 40px;
        color: white;
        text-align: center;
    }
    .api__title-api {
        font-size: 60px;
        color: white;
    }
    </style>
    <div class="api"><h1 class="api__title"><span class="api__title-api">API - Documentace</span><br>Frytol na cestách</h1></div>
    `
    
    
    return {
        statusCode: 200,
        body: html
    }
}