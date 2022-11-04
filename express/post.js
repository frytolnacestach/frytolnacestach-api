import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const express = require('express');
const cors = require('cors');

const router = express.Router();
const app =  express();

router.use(cors());

async function start() {
    
    app.get(':postSlug', async (req, res) =>  {
        var postSlug = req.params.postSlug;

        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('slug', postSlug)
        
            statusCode: 200,
            body: JSON.stringify(data)
        }

        return response
    })
}
start()

module.exports = router;