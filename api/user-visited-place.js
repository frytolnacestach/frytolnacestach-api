import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var email = req.query.email
    var passwordHash = req.query.password_hash
    var idPlace = req.query.id_place
    var type = req.query.type

    try {
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
            const userId = data[0].id

            //place load
            try {
                const { data, error } = await supabase
                    .from('users_visited_place')
                    .select()
                    .eq('id_place', idPlace)
                    .eq('id_user', userId)
                    .eq('type', type)
        
                if (error) {
                    return res.status(500).send("Chyba při aktualizaci")
                }
        
                if (data.length === 0) {
                    return res.status(405).send('Místo uživatel nemá uložené')
                }
        
                res.json({
                    status: 200,
                    message: data
                })
            } catch (error) {
                return res.status(500).send("Server error")
            }
        }
       
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router