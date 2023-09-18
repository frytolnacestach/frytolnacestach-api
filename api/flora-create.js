import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('flora')
            .insert({ 
                slug: req.body.slug,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                seo_tags: JSON.parse(req.body.seo_tags),
                ids_states: JSON.parse(req.body.ids_states),
                name: req.body.name,
                name_lat: req.body.name_lat,
                location: req.body.location,
                status_iucn: req.body.status_iucn,
                status_danger: req.body.status_danger,
                description: req.body.description
            })

        return res.status(201).send("Create flora")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router