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
        let query = null
        if (type === 'continent') {
            query = supabase.from('places_continents')
        } else if (type === 'state') {
            query = supabase.from('places_states')
        } else if (type === 'region') {
            query = supabase.from('places_regions')
        } else if (type === 'city') {
            query = supabase.from('places_cities')
        } else if (type === 'spot') {
            query = supabase.from('places_spots')
        } else {
            return res.status(400).json({ error: 'Invalid type parameter' })
        }

        ({ count, error } = await query
            .select('*', { count: 'exact', head: true })
            .neq('setting_status_public', 0))


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
