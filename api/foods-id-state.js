import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/:slug', async (req, res) => {
  var id = req.params.slug

  try {

    const { data, error } = await supabase
    .from('foods')
    .select()
    .contains("ids_states2", JSON.stringify([{ id: id }]))
    //.contains("ids_states", [{"id": id}])
    //.contains('ids_states->id', id)
    //.filter('ids_states', '@>', `[{ "id": ${id} }]`) 
    //.filter('ids_states->id', '@>', `[{"id": ${id}}]`)
    //.eq('ids_states->id', id)
    //.in('ids_states->id', id) 
    .order('name', { ascending: true })
    

    res.send(JSON.stringify(data))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;