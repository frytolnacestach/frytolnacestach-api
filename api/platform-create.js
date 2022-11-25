import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('platforms')
        .insert({ 
            slug: req.body.body.slug,
            name: req.body.body.name,
            perex: req.body.body.perex,
            url: req.body.body.url,
            facts: JSON.parse(req.body.body.facts),
            date: req.body.body.date
        })

        return res.status(201).send("Create post");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;