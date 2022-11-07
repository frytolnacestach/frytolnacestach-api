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

    async function testFunction3() {
        app.get(':postSlug', async (req, res) =>  {
            var postSlug = req.params.postSlug;

            const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('slug', postSlug)
            
            return JSON.stringify({"test": "Testuji"})
        })
    }  

    async function testFunction4() {
        app.get(':postSlug', async (req, res) =>  {
            var postSlug = req.params.postSlug;
            
            return postSlug
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
        body: "T1" + JSON.stringify(testFunction()) + "T2" + JSON.stringify(testFunction2()) + "T3" + testFunction2() + "T4" + foo("address", function(location){location}) + "T5" + testFunction3() + "T6" + JSON.stringify(testFunction3()) + "T7" + testFunction4()
    }

    return response

    /*return {
        statusCode: 200,
        body: JSON.stringify(data)
    }*/
}