import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = parseInt(req.query.id_user)

    const types = ['continent', 'state', 'region', 'city', 'spot'];
    const responseData = {};

    try {
        for (const type of types) {
            const result = await supabase
                .from('users_visited_place')
                .select('*', { count: 'exact' })
                .eq('id_user', idUser)
                .eq('type', type)
                .eq('status', 1);

            responseData[type] = result.data.length;
            formattedResponse[type] = responseData[type];
        }

        res.send(JSON.stringify([formattedResponse]));

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;