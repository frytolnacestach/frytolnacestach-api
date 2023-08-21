import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = parseInt(req.query.id_user)

    //pocet navštíveních kontinentů
    try {
        const queryPromises = [
            supabase
                .from('users_visited_place')
                .select('*', { count: 'exact', head: true })
                .eq('id_user', idUser)
                .eq('type', 'continent')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('*', { count: 'exact', head: true })
                .eq('id_user', idUser)
                .eq('type', 'state')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('*', { count: 'exact', head: true })
                .eq('id_user', idUser)
                .eq('type', 'region')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('*', { count: 'exact', head: true })
                .eq('id_user', idUser)
                .eq('type', 'city')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('*', { count: 'exact', head: true })
                .eq('id_user', idUser)
                .eq('type', 'spot')
                .eq('status', 1),
        ];

        const results = await Promise.all(queryPromises);

        const responseData = results.map(({ data, error }) => {
            if (error) {
                console.error(error);
                return null;
            }

            const category = data[0] ? data[0].type : null;
            const count = data[0] ? data[0].count : 0;

            return {
                category,
                count,
            };
        });

        res.send(JSON.stringify(responseData));

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;