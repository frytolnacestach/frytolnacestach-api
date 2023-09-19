import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
    var id = req.params.slug
    const showType = req.query.showType

    // Setting select
    let supabaseSelect
    if (showType === "list"){
        supabaseSelect = 'id, id_image_cover, slug, name'
    }

    try {
        const { data, error } = await supabase
            .from('fauna')
            .select(supabaseSelect)
            .contains("ids_states", JSON.stringify([{ id: parseInt(id) }]))

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router