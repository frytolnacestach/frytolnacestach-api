import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('places_states')
            .insert({
                id_continent: req.body.id_continent,
                slug: req.body.slug,
                name: req.body.name
            })

        return res.status(201).send("Create State")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router