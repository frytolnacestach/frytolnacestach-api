import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    const type = req.query.type
    
    try {
        let count
        let error

        // db
        if (type === 'continent') {
            ({ count, error } = await supabase
                .from('places_continents')
                .select('*', { count: 'exact', head: true }))
                .neq('setting_status_public', 0)
        } else if (type === 'state') {
            ({ count, error } = await supabase
                .from('places_states')
                .select('*', { count: 'exact', head: true }))
                .neq('setting_status_public', 0)
        } else if (type === 'region') {
            ({ count, error } = await supabase
                .from('places_regions')
                .select('*', { count: 'exact', head: true }))
                .neq('setting_status_public', 0)
        } else if (type === 'city') {
            ({ count, error } = await supabase
                .from('places_cities')
                .select('*', { count: 'exact', head: true }))
                .neq('setting_status_public', 0)
        } else if (type === 'spot') {
            ({ count, error } = await supabase
                .from('places_spots')
                .select('*', { count: 'exact', head: true }))
                .neq('setting_status_public', 0)
        } else {
            return res.status(400).json({ error: 'Invalid type parameter' })
        }

        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' })
        }

        // response
        res.json({ count })
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
