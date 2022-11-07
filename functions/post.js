import { createClient } from '@supabase/supabase-js'

import express from "express";

const app =  express();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    async function testFunction2() {
        app.get(':postSlug', async (req, res) =>  {
            var postSlug = req.params.postSlug;

            const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('slug', postSlug)     
            
            return data
        })
    }  
    
    function foo(address, fn){
        app.get(':postSlug', async (req, res) =>  {
            var postSlug = req.params.postSlug;

            const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('slug', postSlug)     
            
            fn(data);
        })
    }



    function testFunction() {
        return {"test": "Testuji"}
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(testFunction()) + JSON.stringify(testFunction2()) + testFunction2() + foo("address", function(location){location})
    }

    return response

    /*return {
        statusCode: 200,
        body: JSON.stringify(data)
    }*/
}