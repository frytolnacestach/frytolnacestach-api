import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.put("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('top_places')
            .update({
                id_place: req.body.id_place,
                type: req.body.type
                })
            .eq('id', req.body.id)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router