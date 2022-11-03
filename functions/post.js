import { createClient } from '@supabase/supabase-js'
'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    const postSlug = 'svet-meduz'

    app.get('/post/:postSlug', (request, response) => {
        postSlug = request.params.productSlug; 
    })

    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('slug', postSlug)

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    } 
}

module.exports = app;
module.exports.handler = serverless(app);