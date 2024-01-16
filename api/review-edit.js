import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    // user
    var email = req.body.email
    var passwordHash = req.body.password_hash
    let rating = req.body.rating

    // other var
    let status = 1
    let idUser

    if(rating < 1 || rating > 5 ) {
        return res.status(406).send('Neplatné hodnoty u hodnocení')
    }

    try {
        // Check user
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .eq('password', passwordHash)

        if (error) {
            return res.status(500).send("Server error")
        }

        if (data.length === 0) {
            return res.status(404).send('Uživatel neexistuje')
        } else {
            idUser = data[0].id

            try {
                // add review
                const { data, error } = await supabase
                    .from('users_place_review')
                    .update({
                        rating: rating,
                        text: req.body.text,
                    })
                    .eq('id_place', req.body.id_place)
                    .eq('id_user', idUser)
                    .eq('type', req.body.type)

                return res.status(201).send("Záznam uložen")
            } catch (error) {
                return res.status(500).send("Server error")
            }

        }
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router