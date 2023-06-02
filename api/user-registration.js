import { createClient } from '@supabase/supabase-js'

const bcrypt = require('bcrypt');

const axios = require('axios');

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

        // Funkce pro generování náhodného kódu
        async function generateRandomCode(length) {
            const saltRounds = 10;
            const code = await bcrypt.genSalt(saltRounds);
            return code.slice(0, length);
        }
        const randomCode = await generateRandomCode(24)

        //hash hesla
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //uložení do databaze
        const { error } = await supabase
        .from('users_test')
        .insert({ 
			email: req.body.email,
            password: hashedPassword,
			nickname: req.body.nickname,
            activation_code: randomCode
        })

        if (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }

        // Odeslat registrační e-mail
 
        //posts
        const posts = await axios.get(`https://frytolnacestach-api.vercel.app/api/posts`)

        return res.status(200).send( posts);



        /*try {
            const response = await fetch('https://frytolnacestach-mail.vercel.app/api/registration', {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://frytolnacestach-api.vercel.app",
                    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH"
                },
                method: 'POST',
                body: JSON.stringify({
                    'email': req.body.email,
                    'activation_code': randomCode
                })
            });

            if (response.status === 200 || response.status === 201) {
                return res.status(response.status).send('Účet vytvořen, registrační e-mail odeslán.');
            } else {
                return res.status(500).send('Chyba při komunikaci s API');
            }
        } catch (error) {
            return res.status(500).send('Chyba připojení k API MAIL');
        }*/

        //return res.status(201).send("Učet vytvořen");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
    
});

module.exports = router;