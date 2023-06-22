import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idPlace = req.query.id_place
    var type = req.query.type

    try {
        const { data, error } = await supabase
        .from('users_place_review_duplicate')
        .select()
        .eq('id_place', idPlace)
        .eq('type', type)
        .eq('status', 1)

        if (error) {
            console.error(error);
            return res.status(500).send("Chyba při aktualizaci");
        }
        
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;