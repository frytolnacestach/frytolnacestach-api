import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('places_continents')
        .insert({ 
            slug: req.body.body.slug,
            name: req.body.body.name,
            area: req.body.body.area,
            population: req.body.body.population,
            population_density: req.body.body.populationDensity,
            number_states: req.body.body.states,
            information_chatgpt: req.body.body.information_chatgpt,
            image_cover: req.body.body.image_cover,
            image_hero: req.body.body.image_hero
        })

        return res.status(201).send("Create Continents");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;