import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:id', async (req, res) => {
    var id = req.params.id
    
    try {
        const { count: tabVideos, error: tabVideosError } = await supabase
            .from('places_continents')
            .eq('id_spot', id)
            .select('*', { count: 'exact', head: true })

        const tabs = {
            tabVideos: tabVideos
        }

        res.send(JSON.stringify(tabs))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
