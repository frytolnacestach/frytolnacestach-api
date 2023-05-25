import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
  const id = req.params.slug

  try {
    let data;
    const { data: responseData, error } = await supabase
      .from('foods')
      .select()
      .eq('ids_states->id', id)
      .order('name', { ascending: true });

    if (Array.isArray(responseData)) {
      data = responseData;
    } else if (responseData) {
      data = [responseData];
    } else {
      data = [];
    }

    res.send(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
