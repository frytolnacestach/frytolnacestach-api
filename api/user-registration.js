import { createClient } from '@supabase/supabase-js'

const bcrypt = require('bcrypt');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const { error } = await supabase
        .from('users_test')
        .insert({ 
			email: req.body.email,
            password: hashedPassword,
			nickname: req.body.nickname
        })

        return res.status(201).send("Create Continents");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;