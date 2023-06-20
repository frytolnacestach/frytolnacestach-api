import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const search = req.query.search || ''
  const showType = req.query.showType
  const page = parseInt(req.query.page, 10)
  const items = parseInt(req.query.items, 10)

  //setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = "'id, id_image_cover, slug, type_place, name'";
  }

  try {
    let data;
    let error;
    
    if(page && items) {
      const itemsStart = (page * items) - items;
      const itemsEnd = itemsStart + items - 1;

      const response = await supabase
      .from('places_states')
      .select('id, id_image_cover, slug, type_place, name')
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true })
      .range(itemsStart, itemsEnd);

      data = response.data;
      error = response.error;
    } else {
      const response = await supabase
      .from('places_states')
      .select('id, id_image_cover, slug, type_place, name')
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true });

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