import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

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
			slug: req.body.slug,
            name: req.body.name,
            information_chatgpt: req.body.information_chatgpt,
            information_author: JSON.parse(req.body.information_author),
            coordinates: JSON.parse(req.body.coordinates),
            zoom: JSON.parse(req.body.zoom),
            affiliate: JSON.parse(req.body.affiliate)
        })

        return res.status(201).send("Create region");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;