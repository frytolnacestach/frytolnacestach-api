import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post('/', async (req, res) => {

    try {
        const { error } = await supabase
        .from('travel_dictionaries')
        .insert({
            id_image_cover: req.body.id_image_cover,
            id_image_hero: req.body.id_image_hero,
            slug: req.body.slug,
            name: req.body.name,
            description: req.body.description
        })

        return res.status(201).send("Create post");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;