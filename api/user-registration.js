import { createClient } from '@supabase/supabase-js'

const bcrypt = require('bcrypt')

const slugify = require('slugify')

const axios = require('axios')

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var nickname = req.body.nickname
    var agreementMail = req.body.agreement_mail

    var slug = slugify(req.body.nickname, { lower: true })

    // Kontrola existence uživatele - email
    const { data: existingUser, error: existingError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1)

    if (existingError) {
        return res.status(500).send("Server error: " + existingError)
    }

    if (existingUser.length > 0) {
        return res.status(400).send("Uživatel s touto e-mailovou adresou již existuje.")
    }

    // Kontrola existence uživatele - slug
    const { data: existingUserNicknama, error: existingNicknameError } = await supabase
        .from('users')
        .select('id')
        .eq('slug', slug)
        .limit(1)

    if (existingNicknameError) {
        return res.status(500).send("Server error: " + existingNicknameError)
    }

    if (existingUserNicknama.length > 0) {
        return res.status(401).send("Uživatel s touto přezdívkou již existuje.")
    }

    //Vytvoření účtu
    try {
        // Funkce pro generování náhodného kódu
        async function generateRandomCode(length) {
            const saltRounds = 10
            const code = await bcrypt.genSalt(saltRounds)
            return code.slice(0, length)
        }
        const randomCode = await generateRandomCode(24)

        //hash hesla
        const hashedPassword = await bcrypt.hash(password, 10)

        //uložení do databaze
        const { error } = await supabase
            .from('users')
            .insert({ 
                email: email,
                password: hashedPassword,
                nickname: nickname,
                slug: slug,
                status: 2,
                status_role: 9,
                agreement_mail: agreementMail,
                code_activation: randomCode,
                setting_author_name: 1
            })

        if (error) {
            return res.status(500).send("Server error")
        }

        // Odeslat registrační e-mail
        try {
            const response = await axios.post('https://mail.frytolnacestach.cz/api/registration', {
                email: email,
                code_activation: randomCode
            })

            if (response.status === 200 || response.status === 201) {
                return res.status(response.status).send('Účet vytvořen, registrační e-mail odeslán.')
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