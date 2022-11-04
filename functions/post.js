import { createClient } from '@supabase/supabase-js'

import express from "express";

const router = express.Router();

const app =  express();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    const getPostSlug = app.get('/post/:postSlug', (request, response) => {
        postSlug = request.params.postSlug;

        return postSlug
    })

///
    var content;
    function readingfile() {
        var fs = require('fs');
        content = "test call";
        return content;
    }
    readingfile();
    console.log(content);
///

    router.get(':slug', function (req, res, next) {
        if (req.params.slug === 'trikrizovy-vrch') {
            return next();
        }
        
        // get user data and render
        res.render('user', userdata);
    });


    var postSlug
    function makeSlug(){
        app.get(':postSlug', (request, response) => {
            var fs = require('fs');
            postSlug = "test Slugu"
    
            return postSlug
        })
    }
    makeSlug();
    console.log(postSlug);

    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('slug', getPostSlug)

    return {
        statusCode: 200,
        body: "T1:" + JSON.stringify(data) + "T2:" + getPostSlug + "T3:" + postSlug + "T4:" + content
    } 
}