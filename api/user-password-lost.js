import { createClient } from '@supabase/supabase-js'

const bcrypt = require('bcrypt')

const axios = require('axios')

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email

    // Kontrola existence uživatele - email
    const { data: existingUser, error: existingError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1)

    if (existingError) {
        return res.status(500).send("Server error: " + existingError)
    }

    if (existingUser.length === 0) {
        return res.status(400).send("Uživatel s touto e-mailovou adresou neexistuje.")
    }

    // Reset hesla
    try {
        // Funkce pro generování náhodného kódu
        async function generateRandomCode(length) {
            const saltRounds = 10
            const code = await bcrypt.genSalt(saltRounds)
            return code.slice(0, length)
        }
        const randomCode = await generateRandomCode(24)

        //uložení do databaze
        const { error } = await supabase
            .from('users')
            .update({ 
                code_reset: randomCode,
            })
            .eq('email', email)

        if (error) {
            return res.status(500).send("Server error")
        }

        // Odeslat e-mail o resetu hesla
        try {
            const response = await axios.post('https://mail.frytolnacestach.cz/api/password-lost', {
                email: email,
                code_password: randomCode
            })

            if (response.status === 200 || response.status === 201) {
                return res.status(response.status).send('E-mail pro obnovu hesla byl odeslán.')
            } else {
                return res.status(500).send('Chyba při komunikaci s API')
            }
        } catch (error) {
            return res.status(500).send('Chyba připojení k API MAIL')
        }
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router