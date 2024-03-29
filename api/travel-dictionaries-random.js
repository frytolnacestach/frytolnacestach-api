import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    const showType = req.query.showType
    const quantity = req.query.quantity || ''
    const actualID = req.query.actualID || ''

    // Setting select
    let supabaseSelect
    if (showType === "list"){
        supabaseSelect = 'id, id_image_cover, slug, name'
    }

    try {
        // Base query
        let query = supabase.from('travel_dictionaries')
            .select(supabaseSelect)
            .neq('id', actualID)
            .order('id', { ascending: false })
            .limit(quantity)

        // DATA
        const { data, error } = await query

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router