import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('places_states')
        .insert({ 
			slug: req.body.slug,
			mpz: req.body.mpz,
			tld: req.body.tld,
            name: req.body.name,
            area: req.body.area,
            population: req.body.population,
            information_chatgpt: req.body.information_chatgpt,
            image_cover: req.body.image_cover,
            image_hero: req.body.image_hero
        })

        return res.status(201).send("Create Continents");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;