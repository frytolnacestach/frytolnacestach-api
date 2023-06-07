import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var email = req.body.email
    var passwordHash = req.body.password_hash
    var idPlace = req.body.id_place

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
            .select()
            .eq('id', idPlace)
            .eq('id_user', userId)
    
            if (error) {
                console.error(error);
                return res.status(500).send("Chyba při aktualizaci");
            }
    
            if (data.length === 0) {
                return res.status(405).send('Místo uživatel nemá uložené');
            }
    
            return res.status(200).send('Úživatel byl autorizován');
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