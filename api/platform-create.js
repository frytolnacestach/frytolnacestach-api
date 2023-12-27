import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('platforms')
            .insert({ 
                slug: req.body.slug,
                name: req.body.name,
                perex: req.body.perex,
                url: req.body.url,
                facts: req.body.facts,
                date: req.body.date
            })

        return res.status(201).send("Create platform")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router