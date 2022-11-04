import { createClient } from '@supabase/supabase-js'

import express from "express";

const app =  express();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    const getPostSlug = app.get('/post/:postSlug', (request, response) => {
        postSlug = request.params.postSlug;

        return postSlug
    })

    function makeSlug(slug){
        app.get('/post/:postSlug', (request, response) => {
            postSlug = request.params.postSlug;
    
            return "_test return_"
        })
    }

    let slug = makeSlug()

    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('slug', getPostSlug)

    return {
        statusCode: 200,
        body: JSON.stringify(data) + getPostSlug + slug
    } 
}