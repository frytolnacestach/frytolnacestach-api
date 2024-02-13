import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    const type = req.query.type
    
    try {
        let data
        let error
        let response

        // db
        if (type === 'continent') {
            response = await supabase
                .from('places_continents')
                .select('*', { count: 'exact', head: true })
        } else if (type === 'state') {
            response = await supabase
                .from('places_states')
                .select('*', { count: 'exact', head: true })
        } else if (type === 'region') {
            response = await supabase
                .from('places_regions')
                .select('*', { count: 'exact', head: true })
        } else if (type === 'city') {
            response = await supabase
                .from('places_states')
                .select('*', { count: 'exact', head: true })
        } else if (type === 'spot') {
            response = await supabase
                .from('places_spots')
                .select('*', { count: 'exact', head: true })
        }

        // response
        count = response.count
        error = response.error

        res.send(count)
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
