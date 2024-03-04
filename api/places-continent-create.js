import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('places_continents')
            .insert({
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                type_place: req.body.type_place,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                information_author: parseJson(req.body.information_author),
                area: req.body.area,
                population: req.body.population,
                population_density: req.body.populationDensity,
                number_states: req.body.states,
                seo_tags: parseJson(req.body.seo_tags),
                coordinates: parseJson(req.body.coordinates),
                zoom: parseJson(req.body.zoom),
                setting_top: req.body.setting_top,
                setting_status_public: req.body.setting_status_public
            })

        return res.status(201).send("Create Continent")
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