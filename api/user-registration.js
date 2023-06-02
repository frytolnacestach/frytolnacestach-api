import { createClient } from '@supabase/supabase-js'

const bcrypt = require('bcrypt');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    // Kontrola existence uživatele
    const { data: existingUser, error: existingError } = await supabase
    .from('users_test')
    .select('id')
    .eq('email', req.body.email)
    .limit(1);

    if (existingError) {
        console.error(existingError);
        return res.status(500).send("Server error");
    }

    if (existingUser.length > 0) {
        return res.status(400).send("Uživatel s touto e-mailovou adresou již existuje.");
    }


    //Vytvoření účtu
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const { error } = await supabase
        .from('users_test')
        .insert({ 
			email: req.body.email,
            password: hashedPassword,
			nickname: req.body.nickname
        })

        if (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }

        // Odeslat registrační e-mail
        try {
            const response = await axios.post('https://frytolnacestach-mail.vercel.app/api/registration', {
                email: req.body.email,
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
                },
            });

            if (response.status === 200 || response.status === 201) {
                return res.status(response.status).send('Účet vytvořen, registrační e-mail odeslán.');
            } else {
                return res.status(501).send('Chyba při komunikaci s API');
            }
        } catch (error) {
            return res.status(502).send('Chyba připojení k API MAIL');
        }

        //return res.status(201).send("Učet vytvořen");
    } catch (error) {
        console.error(error);
        return res.status(503).send("Server error");
    }
    
});

module.exports = router;