import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
    
    const { id } = req.query
    const ids = id.split(",").map((id) => parseInt(id))
    const showType = req.query.showType

    // Setting select
    let supabaseSelect
    if (showType === "list"){
        supabaseSelect = 'id, id_image_cover, slug, name'
    }

    try {
        const { data, error } = await supabase
            .from('wall_sockets')
            .select(supabaseSelect)
            .in("id", ids)
            .order('id', { ascending: false })

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router