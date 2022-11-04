import { createClient } from '@supabase/supabase-js'

import express from "express";

const app =  express();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context, callback) => {
    var postSlug
    
    app.get(':postSlug', async (req, res) =>  {
        postSlug = req.params.postSlug;

        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('slug', getPostSlug)

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(data)
        });
    })
}