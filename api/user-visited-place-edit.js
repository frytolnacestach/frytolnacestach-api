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
            return res.status(500).send("Server error");
        }

        if (data.length === 0) {
            return res.status(404).send('Uživatel neexistuje');
        }

        const userId = data[0].id;
        

        //place load
        try {
            const { data, error } = await supabase
            .from('users_visited_place')
            .select('id')
            .eq('id', idPlace)
    
            if (error) {
                console.error(error);
                return res.status(500).send("Chyba při aktualizaci");
            }
    
            if (data.length === 0) {
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
                        return res.status(500).send("Chyba při aktualizaci");
                    }
            
                    if (data.length === 0) {
                        return res.status(404).send('Záznam neexistuje');
                    }
            
                    return res.status(200).send('Účet byl aktivován');
                } catch (error) {
                    console.error(error);
                    return res.status(500).send("Server error");
                }

            }

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
        
                return res.status(201).send("Přidáno do míst");
            } catch (error) {
                console.error(error);
                return res.status(500).send("Server error");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }
       
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;