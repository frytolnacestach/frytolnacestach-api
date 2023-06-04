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
        const { response, error } = await supabase
        .from('users_test')
        .update({ status: 3 })
        .eq('email', email)
        .eq('code_activation', codeActivation)
        .eq('status', 2)


        if (response.status === 200 || response.status === 201) {
            return res.status(response.status).send('Účet byl aktivován');
        } else if (response.status === 404) {
            return res.status(response.status).send('Záznam neexistuje');
        } else {
            return res.status(500).send('Chyba při aktualizaci');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
