import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
    var id = req.params.slug
    
    try {
        const { dataRegions, errorRegions } = await supabase
            .from('places_regions')
            .select()
            .eq('id_state', id)
            .eq('setting_status_public', 1)
        const { dataCities, errorCities } = await supabase
            .from('places_cities')
            .select()
            .eq('id_state', id)
            .eq('setting_status_public', 1)
        const { dataSpots, errorSpots } = await supabase
            .from('places_spots')
            .select()
            .eq('id_state', id)
            .eq('setting_status_public', 1)
        const hasWhatToSee = dataRegions !== null || dataCities !== null || dataSpots !== null

        const { data, error } = await supabase
            .from('places_states')
            .select('ids_neighboring_countries, currency, people_religion, people_nationality, visitors_entry, phone_prefix, affiliate')
            .eq('id', id)
            .eq('setting_status_public', 1)
        const hasPrice = data[0].currency[0] && data[0].currency[0].code !== null
        const hasPeople = data[0].people_religion !== null || data[0].people_nationality !== null
        const hasContacts = data[0].phone_prefix !== null
        const hasTrip = data[0].visitors_entry !== null
        const hasHotel = data[0].affiliate !== null && data[0].affiliate.some(item => item.name === 'booking' && item.value === true)
        const tabNeighboring = data[0].ids_neighboring_countries.length

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

        const { count: tabFauna, error: tabFaunaError } = await supabase
            .from('fauna')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const { count: tabFlora, error: tabFloraError } = await supabase
            .from('flora')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const { count: tabFoods, error: tabFoodsError } = await supabase
            .from('foods')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const { count: tabBrands, error: tabBrandsError } = await supabase
            .from('brands')
            .select('*', { count: 'exact', head: true })
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        const tabs = {
            tabWhatToSee: hasWhatToSee,
            tabPrice: hasPrice,
            tabPeople: hasPeople,
            tabTrip: hasTrip,
            tabContact: hasContacts,
            tabHotel: hasHotel,
            tabNeighboring: tabNeighboring,
            tabVideos: tabVideos,
            tabArticles: tabArticles,
            tabWallSockets: tabWallSockets,
            tabChains: tabChains,
            tabFauna: tabFauna,
            tabFlora: tabFlora,
            tabFoods: tabFoods,
            tabBrands: tabBrands
        }

        res.send(JSON.stringify(tabs))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
