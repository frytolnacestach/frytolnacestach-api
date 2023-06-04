const axios = require('axios');

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    // Odeslat Aktivačního e-mailu
    try {
        const response = await axios.post('https://frytolnacestach-mail.vercel.app/api/activation', {
            email: req.body.email,
            code_activation: randomCode
        });

        if (response.status === 200 || response.status === 201) {
            return res.status(response.status).send('Aktivační e-mail odeslán.');
        } else {
            return res.status(500).send('Chyba při komunikaci s API');
        }
    } catch (error) {
        return res.status(500).send('Chyba připojení k API MAIL');
    }
    
});

module.exports = router;