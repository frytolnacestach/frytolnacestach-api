import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.put('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('travel_dictionaries')
            .update({
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                slug: req.body.slug,
                name: req.body.name,
                description: req.body.description,
                seo_tags: JSON.parse(req.body.seo_tags)
            })
            .eq('slug', req.body.slug)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router