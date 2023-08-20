import { createClient } from '@supabase/supabase-js'

const axios = require('axios');

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var idUser = parseInt(req.query.id_user)


    //pocet navštíveních kontinentů

    //pocet navštíveních států

    //pocet navštíveních regionu

    //pocet navštíveních měst

    //pocet navštíveních míst

    return res.status(200).send("OK");
});

module.exports = router;