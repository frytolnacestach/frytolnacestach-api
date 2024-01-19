import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('places_regions')
            .insert({
                id_state: req.body.id_state,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                type_place: req.body.type_place,
                type_region: req.body.type_region,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                seo_tags: req.body.seo_tags,
                information_author: req.body.information_author,
                coordinates: req.body.coordinates,
                zoom: req.body.zoom,
                affiliate: req.body.affiliate
            })

        return res.status(201).send("Create region")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router