import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('places_cities')
            .insert({
                id_state: req.body.id_state,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                type_place: req.body.type_place,
                importance: req.body.importance,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                information_author: req.body.information_author,
                population: req.body.population,
                area: req.body.area,
                altitude: req.body.altitude,
                seo_tags: req.body.seo_tags,
                coordinates: req.body.coordinates,
                zoom: req.body.zoom,
                affiliate: req.body.affiliate,
                alerts: req.body.alerts,
                parking: req.body.parking
            })

        return res.status(201).send("Create City")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router