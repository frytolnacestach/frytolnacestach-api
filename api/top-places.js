import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const typePlace = req.query.typePlace || ''

  try {
      // Base query
      let query = supabase.from('top_places')
        .select()
        .order('id', { ascending: false })
  
      // ADD typePlace
      if (typePlace !== '' && typePlace !== null) {
        query = query.eq('type', typePlace);
      }

  
      // DATA
      const { data, error } = await query;
  
      res.send(JSON.stringify(data))
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
  
});

module.exports = router;