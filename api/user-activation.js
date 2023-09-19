import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email
    var codeActivation = req.body.code_activation

    try {
        const { data, error } = await supabase
            .from('users')
            .update({ status: 3 })
            .select()
            .eq('email', email)
            .eq('code_activation', codeActivation)
            .eq('status', 2)

        if (error) {
            return res.status(500).send("Chyba při aktualizaci")
        }

        if (data.length === 0) {
            return res.status(404).send('Záznam neexistuje')
        }

        return res.status(200).send('Účet byl aktivován')
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router