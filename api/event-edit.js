import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.put("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .update({
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
                ids_compatibility: JSON.parse(req.body.ids_compatibility),
                seo_tags: JSON.parse(req.body.seo_tags),
                coordinates: JSON.parse(req.body.coordinates),
                zoom: JSON.parse(req.body.zoom),
                affiliate: JSON.parse(req.body.affiliate),
                prices: JSON.parse(req.body.prices),
                links: JSON.parse(req.body.links)
            })
            .eq('slug', req.body.slug)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router