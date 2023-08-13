import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var email = req.query.email
    var passwordHash = req.query.password_hash
    var idFollower = req.query.id_follower

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
        } else {
            const userId = data[0].id;

            try {
                const { data, error } = await supabase
                .from('users_followers')
                .select()
                .eq('id_user', userId)
                .eq('id_follower', idFollower)
                .eq('status', 1)
        
                if (error) {
                    console.error(error);
                    return res.status(500).send("Chyba při načtení");
                }

                if (data.length === 0) {
                    return res.status(405).send('Uživatel, uživatele nesleduje');
                }
                
                res.json({
                    status: 200,
                    message: data,
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send("Server error");
            }
        }
       
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;