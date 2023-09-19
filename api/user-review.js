import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = req.query.id_user

    try {
        const { data, error } = await supabase
            .from('users_place_review')
            .select()
            .eq('id_user', idUser)

        if (error) {
            return res.status(500).send("Chyba při aktualizaci")
        }
        
        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router