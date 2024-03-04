import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    try {
        let data
        let error

        const { id, showType } = req.query
        const ids = id.split(",").map((id) => parseInt(id))

        if ( showType === "list" ) {
            const response =  await supabase
                .from('places_spots')
                .select('id, id_image_cover, slug, type_place, name')
                .in("id", ids)
                .order('id', { ascending: false })
                .eq('setting_status_public', 1)

            data = response.data
            error = response.error
        } else {
            const response =  await supabase
                .from('places_spots')
                .select()
                .in("id", ids)
                .order('id', { ascending: false })
                .eq('setting_status_public', 1)

            data = response.data
            error = response.error
        }

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router