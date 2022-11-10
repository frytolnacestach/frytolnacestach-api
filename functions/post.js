//import { createClient } from '@supabase/supabase-js'

import express from "express";

const app =  express();

const router = express.Router();

//const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
//const supabase = createClient(supabaseUrl, supabaseKey)

let response;

exports.handler = async (event) => {

   
        try {

            const fullUrl = app.get('/.netlify/functions/post/:slug', (req, res, next) => {
                // Show some content to the user
                req.protocol + '://' + req.get('host') + req.originalUrl;
            })

            response = {
                statusCode: 200,
                body: "T1:" + fullUrl
            }


        } catch (err) {
            res.json({ error: err.message || err.toString() });
        }


    return response
/*
    try {

        const actualURL = "https://helpful-nougat-109dab.netlify.app/.netlify/functions/post/svet-meduz"

        const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

        const slug = getLastItem(actualURL)

        //var postSlug = req.params.postSlug;
        //const data2 = postSlug
        const data2 = app.get(':postSlug', async (req, res) =>  {
            */
            /*var postSlug = req.params.postSlug;
    
            const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('slug', postSlug)   */
            /*const { data, error } = await supabase
            .from('posts')
            .select()*/
/*
            let data = {"test": "Testuji"}

            res.send(data)
        })

        const data4 = app.get(':postSlug', (req, res) =>  {
            var postSlug = req.params.postSlug;
            res.send(postSlug)
        })

        const data5 = app.get(':slug', async (req, res) =>  {
            var postSlug = req.params.slug;
            res.send(postSlug)
        })

        const data6 = app.get('/.netlify/functions/post/:id', function (req, res) {
            console.log(req.params['id']);
            res.send();
          });

          const data7 = app.get('/.netlify/functions/post/:id', function (req, res) {
            res.send({"test": "Testuji"});
          });

          const data8 = app.get('/', (req, res) =>  {
            var postSlug = req.params.postSlug;
            res.send(postSlug)
        })



        const data3 = await supabase
            .from('posts')
            .select()

        response = {
            statusCode: 200,
            body: "T1:" + "Test response" + "T2:" + JSON.stringify(data2) + "T3:" + data2 + "T4:" + data3 + "T5:" + JSON.stringify(data3) + "T6:" + data4 + "T7:" + data5 + "T8:" + data6 + "T9:" + data7 + "T10:" + slug
        }
    } catch (e) {
        console.log(e);
    }

    return response*/
};
/*
app.get(':postSlug', async (req, res) =>  {
    var postSlug = req.params.postSlug;

    exports.handler = async (event, context) => {

        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('slug', postSlug)     
        
        //return data

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }
})
*/
/*
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
            
            postSlug
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

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}*/