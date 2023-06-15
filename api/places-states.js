import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const search = req.query.search || ''
  const page = req.query.page
  const perPage = req.query.perPage

  try {
    
    if(page && perPage) {
      const { data, error } = await supabase
      .from('places_states')
      .select()
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true })
      .range(page, page + perPage - 1)
    } else {
      const { data, error } = await supabase
      .from('places_states')
      .select()
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true })
    }

    res.send(JSON.stringify(data))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;