import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
            .from('foods')
            .insert({
                slug: req.body.slug,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                seo_tags: parseJson(req.body.seo_tags),
                ids_states: parseJson(req.body.ids_states),
                name: req.body.name,
                description: req.body.description,
                ingredients: parseJson(req.body.ingredients),
                recipe: parseJson(req.body.recipe)
            })

        return res.status(201).send("Create food")
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