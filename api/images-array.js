import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  try {

    const { id_image_cover } = req.query;
    const ids = id_image_cover.split(",").map((id) => parseInt(id));

    const { data, error } = await supabase
    .from('images')
    .select()
    .in("id_image_cover", ids)
    .order('id', { ascending: false })

    res.send(JSON.stringify(data))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;