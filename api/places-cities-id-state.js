import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
  const showType = req.query.showType
  var id = req.params.slug

  //setting Select
  let supabaseSelect;
  if (showType === "list"){
    supabaseSelect = 'id, id_image_cover, importance, slug, type_place, name, biggest';
  }

  try {
    const { data, error } = await supabase
    .from('places_cities')
    .select(supabaseSelect)
    .eq('id_state', id)
    .order('name', { ascending: true })

    res.send(JSON.stringify(data))
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }

});

module.exports = router;