import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
    const showType = req.query.showType
    var id = req.params.slug

    // Setting select
    let supabaseSelect
    if (showType === "list"){
        supabaseSelect = 'id, id_image_cover, slug, type_place, name'
    }

    try {
        const { data, error } = await supabase
            .from('places_states')
            .select(supabaseSelect)
            .eq('id_continent', id)
            .order('name', { ascending: true })
            .eq('setting_status_public', 1)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router