import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
    // varible - query
    const admin = req.query.admin === true ? true : false
    const slug = req.params.slug

    try {
        // Base query
        let query = supabase.from('places_continents')
            .select()    
            .eq('slug', slug)

        // admin
        if (admin) {
            query = query.neq('setting_status_public', 0)
        } else {
            query = query.eq('setting_status_public', 1)
        }

        // DATA
        const { data, error } = await query

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router