import { createClient } from '@supabase/supabase-js'

const axios = require('axios')

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = parseInt(req.query.id_user)

    try {
        const { data, error } = await supabase
            .from('users_followers')
            .select()
            .eq('id_user', idUser)
            .eq('status', 1)

        if (error) {
            return res.status(500).send("Chyba při načtení")
        }
        
        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router