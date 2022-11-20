import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('posts')
        .insert({ title: req.body.title })

        return res.status(201).send("Edit post: " + req.body.title);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;