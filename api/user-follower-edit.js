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
    var idFollower = req.body.id_follower
    var status = parseInt(req.body.status)

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

            //follower load
            try {
                const { data, error } = await supabase
                .from('users_followers_duplicate')
                .select()
                .eq('id_follower', idFollower)
                .eq('id_user', userId)
        
                if (error) {
                    console.error(error);
                    return res.status(500).send("Chyba při aktualizaci");
                }
        
                if (data.length === 0) {
                    //Add to followers
                    try {
                        const { data, error } = await supabase
                        .from('users_followers_duplicate')
                        .insert({ 
                            id_user: userId,
                            id_follower: idFollower,
                            status: status
                        })

                        return res.status(201).send("Záznam uložen");
                    } catch (error) {
                        console.error(error);
                        return res.status(500).send("Server error");
                    }
                } else {
                    //Update followers
                    const followerId = data[0].id;
                    const followerStatus = data[0].status;

                    if (followerStatus === status ) {
                        try {
                            const { data, error } = await supabase
                            .from('users_followers_duplicate')
                            .update(
                                { status: 0 }
                            )
                            .eq('id', followerId)
                    
                            return res.status(200).send("Záznam odebrán");
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send("Server error");
                        }
                    } else {
                        try {
                            const { data, error } = await supabase
                            .from('users_followers_duplicate')
                            .update(
                                { status: status }
                            )
                            .eq('id', followerId)
                    
                            return res.status(201).send("Záznam uložen");
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send("Server error");
                        }
                    }
                }
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