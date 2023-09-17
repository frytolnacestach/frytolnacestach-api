import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  const showType = req.query.showType
  const search = req.query.search || ''
  const page = parseInt(req.query.page, 10)
  const items = parseInt(req.query.items, 10)
  const start = parseInt(req.query.start || '0')
  const end = parseInt(req.query.end || '999')

  // setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = 'id, id_image_cover, slug, name';
  }
  
  try {
    // Base query
    let query = supabase.from('wall-sockets')
      .select(supabaseSelect)
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true });

    // ADD range
    if (page && items) {
      const itemsStart = (page * items) - items;
      const itemsEnd = itemsStart + items - 1;
      query = query.range(itemsStart, itemsEnd);
    }

    // ADD range large
    if (!page && !items) {
      query = query.range(start, end);
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