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
            dir: req.body.dir,
            slug: req.body.slug,
            path: req.body.path,
            date: req.body.date,
            dateUpdate: req.body.dateUpdate,
            dateInformation: req.body.dateInformation,
            imageList: req.body.imageList,
            imageHero: req.body.imageHero,
            imageMap: req.body.imageMap,
            urlYoutube: req.body.urlYoutube,
            urlWiki: req.body.urlWiki,
            urlMap: req.body.urlMap,
            title: req.body.title,
            perex: req.body.perex,
            textOpener: req.body.textOpener,
            textAuthor: req.body.textAuthor,
            textWiki: req.body.textWiki,
            reviewText: req.body.reviewText,
            reviewValue: req.body.reviewValue,
            perexPrice: req.body.perexPrice,
            perexTriplength: req.body.perexTriplength,
            perexTime: req.body.perexTime,
            tags: JSON.parse(req.body.tags),
            locations: JSON.parse(req.body.locations),
            travels: JSON.parse(req.body.travels),
            prices: JSON.parse(req.body.prices),
            triplengths: JSON.parse(req.body.triplengths),
            times: JSON.parse(req.body.times)
        })

        return res.status(201).send("Create post");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;