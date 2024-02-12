import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    const type = req.query.type
    const search = req.query.search || ''
    const page = parseInt(req.query.page, 10)
    const items = parseInt(req.query.items, 10)

    try {
        let data
        let error
        let response

        // items filter
        const itemsStart = (page * items) - items
        const itemsEnd = itemsStart + items - 1

        // db
        if (type === 'continent') {
            response = await supabase
                .from('places_continents')
                .select('id, slug, name, information_chatgpt, information_author')
                .ilike('name', `%${search}%`)
                .order('name', { ascending: true })
                .range(itemsStart, itemsEnd)
        } else if (type === 'state') {
            response = await supabase
                .from('places_states')
                .select('id, slug, name, information_chatgpt, information_author')
                .ilike('name', `%${search}%`)
                .order('name', { ascending: true })
                .range(itemsStart, itemsEnd)
        } else if (type === 'region') {
            response = await supabase
                .from('places_regions')
                .select('id, slug, name, information_chatgpt, information_author')
                .ilike('name', `%${search}%`)
                .order('name', { ascending: true })
                .range(itemsStart, itemsEnd)
        } else if (type === 'city') {
            response = await supabase
                .from('places_states')
                .select('id, slug, name, information_chatgpt, information_author')
                .ilike('name', `%${search}%`)
                .order('name', { ascending: true })
                .range(itemsStart, itemsEnd)
        } else if (type === 'spot') {
            response = await supabase
                .from('places_spots')
                .select('id, slug, name, information_chatgpt, information_author')
                .ilike('name', `%${search}%`)
                .order('name', { ascending: true })
                .range(itemsStart, itemsEnd)
        }

        // response
        data = response.data
        error = response.error

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router