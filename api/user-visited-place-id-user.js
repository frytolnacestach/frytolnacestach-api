import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = req.query.id_user
    var status = req.query.status

    try {
        const { data, error } = await supabase
        .from('users_visited_place')
        .select()
        .eq('id_user', idUser)
        .eq('status', status)

        if (error) {
            console.error(error);
            return res.status(500).send("Chyba při aktualizaci");
        }

        if (data.length === 0) {
            return res.status(405).send('Nemáš tu ždaná místa');
        }

        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;