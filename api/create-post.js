import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

    try {
        const { error } = await supabase
        .from('posts')
        .insert({ 
            dir: req.body.body.dir,
            slug: req.body.body.slug,
            path: req.body.body.path,
            date: req.body.body.date,
            dateUpdate: req.body.body.dateUpdate,
            dateInformation: req.body.body.dateInformation,
            imageList: req.body.body.imageList,
            imageHero: req.body.body.imageHero,
            imageMap: req.body.body.imageMap,
        })

        return res.status(201).send("Create post");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;