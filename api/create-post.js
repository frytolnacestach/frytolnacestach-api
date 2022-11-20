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
        .insert({ 
            dir: req.body.body.dir,
            slug: req.body.body.slug,
            urlYoutube: req.body.body.urlYoutube,
            urlWiki: req.body.body.urlWiki,
            urlMap: req.body.body.urlMap,
            title: req.body.body.title,
            perex: req.body.body.perex,
            textOpener: req.body.body.textOpener,
            textAuthor: req.body.body.textAuthor,
            textWiki: req.body.body.textWiki,
            reviewText: req.body.body.reviewText,
            reviewValue: req.body.body.reviewValue,
            perexPrice: req.body.body.perexPrice,
            perexTriplength: req.body.body.perexTriplength,
            perexTime: req.body.body.perexTime,
            tags: JSON.parse(req.body.body.tags),
            locations: JSON.parse(req.body.body.locations),
            travels: JSON.parse(req.body.body.travels),
            prices: JSON.parse(req.body.body.prices),
            triplengths: JSON.parse(req.body.body.triplengths),
            times: JSON.parse(req.body.body.times)
        })

        return res.status(201).send("Create post");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;