import { createClient } from '@supabase/supabase-js'

import express from "express";

const app =  express();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = async function(req, res) {

    app.get(':postSlug', async (req, res) =>  {
        var postSlug = req.params.postSlug;

        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('slug', postSlug)

        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    
        return response
        
    })

    /*return {
        statusCode: 200,
        body: JSON.stringify(data)
    }*/
}