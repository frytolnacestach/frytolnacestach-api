import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  // varible - query
  const showType = req.query.showType
  const search = req.query.search || ''
  const page = parseInt(req.query.page, 10)
  const items = parseInt(req.query.items, 10)
  const start = parseInt(req.query.start || '0')
  const end = parseInt(req.query.end || '999')
  
  // setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = 'id, id_image_cover, slug, type_place, name';
  } else if (showType === "search") {
    supabaseSelect = 'id, slug, type_place, name';
  }

  try {
    let data;
    let error;
    
    if(page && items) {
      // items filter
      const itemsStart = (page * items) - items;
      const itemsEnd = itemsStart + items - 1;
      // db
      const response = await supabase
        .from('places_cities')
        .select(supabaseSelect)
        .ilike('name', `%${search}%`)
        .order('name', { ascending: true })
        .range(itemsStart, itemsEnd);
      // response
      data = response.data;
      error = response.error;
    } else {
      // db
      const response = await supabase
        .from('places_cities')
        .select(supabaseSelect)
        .ilike('name', `%${search}%`)
        .order('name', { ascending: true })
        .range(start, end);
      // response
      data = response.data;
      error = response.error;
    }

    res.send(JSON.stringify(data))
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }

});

module.exports = router;