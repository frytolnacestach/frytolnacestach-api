import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    //var id = req.params.id
    
    try {
        const { count: tabVideos, error: tabVideosError } = await supabase
            .from('videos')
            .select('*', { count: 'exact', head: true })

        const { count: tabArticles, error: tabArticlesError } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })

        const tabs = {
            tabVideos: tabVideos,
            tabArticles: tabArticles
        }

        res.send(JSON.stringify(tabs))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
