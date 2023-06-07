import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email
    var passwordHash = req.body.password_hash
    var idPlace = req.body.id_place
    var type = req.body.type
    var status = req.body.status

    try {
        const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .eq('password', passwordHash)

        if (error) {
            console.error(error);
            return res.status(507).send("Server error");
        }

        if (data.length === 0) {
            return res.status(404).send('Uživatel neexistuje');
        } else {
            const userId = data[0].id;

            //place load
            try {
                const { data, error } = await supabase
                .from('users_visited_place')
                .select('id')
                .eq('id_place', idPlace)
                .eq('id_user', userId)
                .eq('type', type)
        
                if (error) {
                    console.error(error);
                    return res.status(501).send("Chyba při aktualizaci");
                }
        
                if (data.length === 0) {
                    //Add visited place
                    try {
                        const { error } = await supabase
                        .from('users_visited_place')
                        .insert({ 
                            id_user: userId,
                            id_place: idPlace,
                            type: type,
                            status: status
                        })

                        res.json({
                            status: 200,
                            message: data,
                        });
                    } catch (error) {
                        console.error(error);
                        return res.status(504).send("Server error");
                    }
                } else {
                    //Update visited place
                    const visitedId = data[0].id;
                    try {
                        const { data, error } = await supabase
                        .from('users_visited_place')
                        .update(
                            { status: status }
                        )
                        .eq('id', visitedId)
                
                        if (error) {
                            console.error(error);
                            return res.status(502).send("Chyba při aktualizaci");
                        }
                
                        if (data.length === 0) {
                            return res.status(404).send('Záznam neexistuje');
                        }
                
                        res.json({
                            status: 200,
                            message: data,
                        });
                    } catch (error) {
                        console.error(error);
                        return res.status(503).send("Server error");
                    }
                }
            } catch (error) {
                console.error(error);
                return res.status(505).send("Server error");
            }
        }
       
    } catch (error) {
        console.error(error);
        return res.status(506).send("Server error");
    }
    
});

module.exports = router;