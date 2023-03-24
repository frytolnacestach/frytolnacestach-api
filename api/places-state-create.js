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
			slug: req.body.body.slug,
			mpz: req.body.body.mpz,
			tld: req.body.body.tld,
            name: req.body.body.name,
            area: req.body.body.area,
            population: req.body.body.population
        })

        return res.status(201).send("Create Continents");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;