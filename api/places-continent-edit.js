import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.put("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('places_continents')
            .update({
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                type_place: req.body.type_place,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                information_author: JSON.parse(req.body.information_author),
                area: req.body.area,
                population: req.body.population,
                population_density: req.body.populationDensity,
                number_states: req.body.states,
                seo_tags: JSON.parse(req.body.seo_tags),
                coordinates: JSON.parse(req.body.coordinates),
                zoom: JSON.parse(req.body.zoom),
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