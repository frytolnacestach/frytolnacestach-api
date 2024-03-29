import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
        .from('videos')
        .insert({ 
            slug: req.body.slug,
            id_continent: req.body.id_continent,
            id_state: req.body.id_state,
            id_region: req.body.id_region,
            id_city: req.body.id_city,
            id_spot: req.body.id_spot,
            id_image: req.body.id_image,
            platform: req.body.platform,
            title: req.body.title,
            perex: req.body.perex,
            url: req.body.url,
            seo_tags: parseJson(req.body.seo_tags)
        })

        return res.status(201).send("Create video")
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