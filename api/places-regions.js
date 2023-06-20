import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const showType = req.query.showType
  const search = req.query.search || ''
  const start = parseInt(req.query.start || '0')
  const end = parseInt(req.query.end || '999')
  
  //setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = 'id, id_image_cover, slug, type_place, name';
  } else if (showType === "search") {
    supabaseSelect = 'id, slug, type_place, name';
  }

  try {
    const { data, error } = await supabase
    .from('places_regions')
    .select(supabaseSelect)
    .ilike('name', `%${search}%`)
    .order('name', { ascending: true })
    .range(start, end)

    res.send(JSON.stringify(data))
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;