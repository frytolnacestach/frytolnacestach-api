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
  const idContinent = req.query.idContinent || ''

  // setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = 'id, id_image_cover, slug, type_place, name';
  } else if (showType === "search") {
    supabaseSelect = 'id, slug, type_place, name';
  } else if (showType === "filter") {
    supabaseSelect = 'id, name';
  }

  try {
    // Base query
    let query = supabase.from('places_states')
      .select(supabaseSelect)
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true });

    // ADD idContinent
    if (idContinent !== '' || idContinent !== null) {
      query = query.eq('id_continent', idContinent);
    }

    // ADD range
    if (page && items) {
      const itemsStart = (page * items) - items;
      const itemsEnd = itemsStart + items - 1;
      query = query.range(itemsStart, itemsEnd);
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