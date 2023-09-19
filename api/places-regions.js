import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    // varible - query
    const showType = req.query.showType
    const search = req.query.search || ''
    const page = parseInt(req.query.page, 10)
    const items = parseInt(req.query.items, 10)
    const start = parseInt(req.query.start || '0')
    const end = parseInt(req.query.end || '999')
    const idState = req.query.idState || ''

    // Setting select
    let supabaseSelect
    if (showType === "list"){
        supabaseSelect = 'id, id_image_cover, slug, type_place, name'
    } else if (showType === "search") {
        supabaseSelect = 'id, slug, type_place, name'
    }

    try {
        // Base query
        let query = supabase.from('places_regions')
            .select(supabaseSelect)
            .ilike('name', `%${search}%`)
            .order('name', { ascending: true })

        // ADD idState
        if (idState !== '' && idState !== null) {
            query = query.eq('id_state', idState)
        }

        // ADD range
        if (page && items) {
            const itemsStart = (page * items) - items
            const itemsEnd = itemsStart + items - 1
            query = query.range(itemsStart, itemsEnd)
        }

        // ADD range large
        if (!page && !items) {
            query = query.range(start, end)
        }

        // DATA
        const { data, error } = await query

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router