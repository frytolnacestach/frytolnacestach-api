import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/:email/:code_activation", async (req, res) => {
    var email = req.params.email
    var codeActivation = req.params.code_activation

    try {
        const { data, error } = await supabase
        .from('users_test')
        .select()
        .eq('email', email);

    if (error) {
        console.error(error);
        return res.status(500).send("Server error 2");
    }

    if (data.length === 0) {
        return res.status(404).send("User not found");
    }

    const user = data[0];
    if (password !== user.password) {
        return res.status(401).send("Invalid password");
    }

    res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error 3");
    }
});

module.exports = router;
