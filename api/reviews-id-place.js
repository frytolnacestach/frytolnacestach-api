import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    let data;
    let error;
    
    var idPlace = req.query.id_place
    var idUser = req.query.id_user || null
    var type = req.query.type

    try {
        if ( idUser !== null ) {
            const response =  await supabase
            .from('users_place_review_duplicate')
            .select()
            .eq('id_place', idPlace)
            .eq('id_user', idUser)
            .eq('type', type)
            .eq('status', 1)
      
            data = response.data;
            error = response.error;
          } else {
            const response =  await supabase
            .from('users_place_review_duplicate')
            .select()
            .eq('id_place', idPlace)
            .eq('type', type)
            .eq('status', 1)
      
            data = response.data;
            error = response.error;
          }
        
        res.send(JSON.stringify(data))
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;