import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const initial = req.query.initial || ''
  
  try {
    const { data, error } = await supabase
      .from('places_cities')
      .select()
      .ilike('name', `${initial}%`)
      .order('id', { ascending: true })

    res.send(JSON.stringify(data))

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;