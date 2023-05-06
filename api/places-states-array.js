import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  try {

    const { id } = req.query;
    const ids = id.split(",").map((id) => parseInt(id));

    const { data, error } = await supabase
    .from('places_states')
    .select()
    .in("id", ids)
    .order('id', { ascending: false })

    res.send(JSON.stringify(data))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;