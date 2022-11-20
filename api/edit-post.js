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
        .update({ 
            dir: req.body.body.dir,
            slug: req.body.body.slug,
            path: req.body.body.path,
            date: req.body.body.date,
            dateUpdate: req.body.body.dateUpdate,
            dateInformation: req.body.body.dateInformation,
            imageList: req.body.body.imageList,
            imageHero: req.body.body.imageHero,
            imageMap: req.body.body.imageMap,
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
            tags: req.body.body.tags.replace(/\\/g, ""),
            locations: req.body.body.locations.replace(/\\/g, ""),
            travels: req.body.body.travels.replace(/\\/g, ""),
            prices: req.body.body.prices.replace(/\\/g, ""),
            triplengths: req.body.body.triplengths.replace(/\\/g, ""),
            times: req.body.body.times.replace(/\\/g, "")
        })
        .eq('slug', req.body.body.slug)

        return res.status(201).send("Edit post");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;