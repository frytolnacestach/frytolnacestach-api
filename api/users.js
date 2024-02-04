import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    const showType = req.query.showType
    const search = req.query.search || ''
    const page = parseInt(req.query.page, 10)
    const items = parseInt(req.query.items, 10)

    // Setting select
    let supabaseSelect
    if (showType === "xml") {
        supabaseSelect = 'id, slug'
    } else if (showType === "list"){
        supabaseSelect = 'id, slug, nickname, surname, lastname, status'
    } else if (showType === "search") {
        supabaseSelect = 'id, slug, nickname'
    } else {
        supabaseSelect = 'id, slug, nickname, surname, lastname, status'
    }

    try {
        let data
        let error

        if(page && items) {
            // items filter
            const itemsStart = (page * items) - items
            const itemsEnd = itemsStart + items - 1

            // db
            const response = await supabase
                .from('users')
                .select(supabaseSelect)
                .ilike('nickname', `%${search}%`)
                .order('id', { ascending: false })
                .range(itemsStart, itemsEnd)
                .eq('status', 3)

            // response
            data = response.data
            error = response.error
        } else {
            // db
            const response = await supabase
                .from('users')
                .select(supabaseSelect)
                .ilike('nickname', `%${search}%`)
                .order('id', { ascending: false })
                .eq('status', 3)

            // response
            data = response.data
            error = response.error
        }

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router