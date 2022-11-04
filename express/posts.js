import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const express = require('express');
const cors = require('cors');

const router = express.Router();
const body_parser = require('body-parser')

router.use(cors());
router.use(body_parser.json())

async function start() {
    const { data, error } = await supabase
    .from('posts')
    .select()

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
start()

module.exports = router;