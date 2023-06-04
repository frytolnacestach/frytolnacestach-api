import { createClient } from '@supabase/supabase-js'
const bcrypt = require('bcrypt');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/:email/:password", async (req, res) => {
    var email = req.params.email

    try {
        const { data, error } = await supabase
            .from('users_test')
            .select()
            .eq('email', email);

        if (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }

        if (data.length === 0) {
            return res.status(404).send("User not found");
        }

        res.json({
            status: 200,
            message: data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
