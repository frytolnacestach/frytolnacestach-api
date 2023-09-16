import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('food')
        .insert({
            slug: req.body.slug,
            id_image_cover: req.body.id_image_cover,
            id_image_hero: req.body.id_image_hero,
            seo_tags: JSON.parse(req.body.seo_tags),
            ids_states: JSON.parse(req.body.ids_states),
            name: req.body.name,
            description: req.body.description,
            ingredients: JSON.parse(req.body.ingredients),
            recipe: req.body.recipe
        })

        return res.status(201).send("Create Continents");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;