import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('wall-sockets')
            .insert({
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                slug: req.body.slug,
                label: req.body.label,
                name: req.body.name,
                description: req.body.description,
                seo_tags: JSON.parse(req.body.seo_tags)
            })

        return res.status(201).send("Create Wall sockets")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router