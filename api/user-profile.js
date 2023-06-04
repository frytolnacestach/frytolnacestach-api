import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:email', async (req, res) => {
    var email = req.params.email
    try {

        const { data, error } = await supabase
        .from('users_test')
        .select()
        .eq('email', email)

        res.send(JSON.stringify(data))

    } catch (error) {

        console.error(error);
        return res.status(500).send("Server error");

    }
});

module.exports = router;