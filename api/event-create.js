import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('events')
            .insert({
                id_state: req.body.id_state,
                id_region: req.body.id_region,
                id_city: req.body.id_city,
                id_spot: req.body.id_spot,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                slug: req.body.slug,
                name: req.body.name,
                description: req.body.description,
                seo_tags: req.body.seo_tags,
                coordinates: req.body.coordinates,
                zoom: req.body.zoom,
                affiliate: req.body.affiliate,
                prices: req.body.prices,
                links: req.body.links
            })

        return res.status(201).send("Create event")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router