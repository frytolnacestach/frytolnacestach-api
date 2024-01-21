import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('posts')
            .insert({ 
                slug: req.body.slug,
                id_continent: req.body.id_continent,
                id_state: req.body.id_state,
                id_region: req.body.id_region,
                id_city: req.body.id_city,
                id_spot: req.body.id_spot,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                id_image_map: req.body.id_image_map,
                date_information: req.body.date_information,
                url_youtube: req.body.url_youtube,
                url_wiki: req.body.url_wiki,
                url_map: req.body.url_map,
                title: req.body.title,
                perex: req.body.perex,
                text_opener: req.body.text_opener,
                text_author: req.body.text_author,
                text_wiki: req.body.text_wiki,
                review_text: req.body.review_text,
                review_value: req.body.review_value,
                perex_price: req.body.perex_price,
                perex_triplength: req.body.perex_triplength,
                perex_time: req.body.perex_time,
                seo_tags: parseJson(req.body.seo_tags),
                tags: parseJson(req.body.tags),
                locations: parseJson(req.body.locations),
                travels: parseJson(req.body.travels),
                prices: parseJson(req.body.prices),
                triplengths: parseJson(req.body.triplengths),
                times: parseJson(req.body.times)
            })

        return res.status(201).send("Create post")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

function parseJson(value) {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error parsing JSON: ${value}`);
        return null;
    }
}

module.exports = router