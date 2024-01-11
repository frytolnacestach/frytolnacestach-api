import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    const limit = req.query.limit || ''
    const status = req.query.status || ''
    const search = req.query.search || ''
    const page = parseInt(req.query.page, 10)
    const items = parseInt(req.query.items, 10)
    const start = parseInt(req.query.start || '0')
    const end = parseInt(req.query.end || '999')
    const currentTime = new Date().toISOString()

    try {
        let query = supabase.from('events')
            .select()
            .ilike('name', `%${search}%`)

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

        // ADD limit
        if (limit) {
            query = query.limit(limit)
        }
        
        // ADD order and gte
        if (status === "nearby") {
            query = query.gte('date_start', currentTime)
            query = query.order('date_start', { ascending: true, nullsFirst: true })
        } else {
            query = query.order('name', { ascending: true })
        }

        // DATA
        const { data, error } = await query

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router