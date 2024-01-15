import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    var id = 56
    
    try {
        const { count: tabVideos, error: tabVideosError } = await supabase
            .from('videos')
            .select('*', { count: 'exact', head: true })
            .eq('id_state', id)

        const { count: tabArticles, error: tabArticlesError } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('id_state', id)

        const { count: tabWallSockets, error: tabWallSocketsError } = await supabase
            .from('wall_sockets')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const { count: tabChains, error: tabChainsError } = await supabase
            .from('chains')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const tabs = {
            tabVideos: tabVideos,
            tabArticles: tabArticles,
            tabWallSockets: tabWallSockets,
            tabChains: tabChains
        }

        res.send(JSON.stringify(tabs))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
