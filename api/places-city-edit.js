import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.put("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('places_cities')
            .update({
                id_state: req.body.id_state,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                type_place: req.body.type_place,
                importance: req.body.importance,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                information_author: JSON.parse(req.body.information_author),
                population: req.body.population,
                area: req.body.area,
                altitude: req.body.altitude,
                seo_tags: JSON.parse(req.body.seo_tags),
                coordinates: JSON.parse(req.body.coordinates),
                zoom: JSON.parse(req.body.zoom),
                affiliate: JSON.parse(req.body.affiliate),
                alerts: JSON.parse(req.body.alerts),
                parking: JSON.parse(req.body.parking),
                setting_top: req.body.setting_top,
                setting_status_public: 1
            })
            .eq('slug', req.body.slug)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router