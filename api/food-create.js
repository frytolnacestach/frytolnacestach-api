import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

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
                seo_tags: req.body.seo_tags,
                ids_states: req.body.ids_states,
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe
            })

        return res.status(201).send("Create food")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router