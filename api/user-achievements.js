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
                .select('type', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', 'continent')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('type', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', 'state')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('type', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', 'region')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('type', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', 'city')
                .eq('status', 1),
            supabase
                .from('users_visited_place')
                .select('type', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', 'spot')
                .eq('status', 1),
        ];

        if (queryResult.error) {
            console.error(queryResult.error);
            return res.status(500).send("Chyba při získávání dat");
        }

        const responseData = {};

        queryResult.data.forEach(({ type, count }) => {
            responseData[type] = count;
        });

        res.send(JSON.stringify(responseData));

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;