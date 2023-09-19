import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email
    var passwordHash = req.body.password_hash
    var idPlace = req.body.id_place
    var type = req.body.type
    var status = parseInt(req.body.status)

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
                    //Add visited place
                    try {
                        const { data, error } = await supabase
                            .from('users_visited_place')
                            .insert({ 
                                id_user: userId,
                                id_place: idPlace,
                                type: type,
                                status: status
                            })

                        return res.status(201).send("Záznam uložen")
                    } catch (error) {
                        return res.status(500).send("Server error")
                    }
                } else {
                    //Update visited place
                    const placeVisitedId = data[0].id
                    const placeStatus = data[0].status

                    if (placeStatus === status ) {
                        try {
                            const { data, error } = await supabase
                                .from('users_visited_place')
                                .update(
                                    { status: 0 }
                                )
                                .eq('id', placeVisitedId)
                    
                            return res.status(200).send("Záznam odebrán")
                        } catch (error) {
                            return res.status(500).send("Server error")
                        }
                    } else {
                        try {
                            const { data, error } = await supabase
                                .from('users_visited_place')
                                .update(
                                    { status: status }
                                )
                                .eq('id', placeVisitedId)
                    
                            return res.status(201).send("Záznam uložen")
                        } catch (error) {
                            return res.status(500).send("Server error")
                        }
                    }
                }
            } catch (error) {
                return res.status(500).send("Server error")
            }
        }
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router