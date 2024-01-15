import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    var id = 56
    
    try {
        const { dataRegions, errorRegions } = await supabase
            .from('places_regions')
            .select()
            .eq('id_state', id)
        const { dataCities, errorCities } = await supabase
            .from('places_cities')
            .select()
            .eq('id_state', id)
        const { dataSpots, errorSpots } = await supabase
            .from('places_spots')
            .select()
            .eq('id_state', id)
        const hasWhatToSee = dataRegions !== null || dataCities !== null || dataSpots !== null

        const { data, error } = await supabase
            .from('places_states')
            .select('ids_neighboring_countries, currency_code, people_religion, people_nationality, visitors_entry, phone_prefix, affiliate')
            .eq('id', id)
        const hasPrice = data[0].currency_code !== null
        const hasPeople = data[0].people_religion !== null || data[0].people_nationality !== null
        const hasContacts = data[0].phone_prefix !== null
        const hasTrip = data[0].visitors_entry !== null
        const hasHotel = data[0].affiliate !== null && data[0].affiliate.some(item => item.name === 'booking' && item.value === true)
        const hasNeighboring = data[0].ids_neighboring_countries !== null && Array.isArray(data[0].ids_neighboring_countries) && data[0].ids_neighboring_countries.length > 0

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
            tabWhatToSee: hasWhatToSee,
            tabPrice: hasPrice,
            tabPeople: hasPeople,
            tabTrip: hasTrip,
            tabContact: hasContacts,
            tabHotel: hasHotel,
            tabNeighboring: hasNeighboring,
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
