/*const express = require('express');
const router = express.Router();

const FTPClient = require('basic-ftp');

router.post('/', async (req, res) => {
  try {
    const image = req.files.image;

    const client = new FTPClient();
    await client.access({
      host: process.env.FTP_IMAGE_HOST,
      user: process.env.FTP_IMAGE_USER,
      password: process.env.FTP_IMAGE_PASS,
      port: 21,
    });

    await client.uploadFrom(image.path, '/storage/__test/' + image.name);

    client.close();

    return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
  }
});*/

import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
  try {

    const { id } = req.query;
    const ids = id.split(",").map((id) => parseInt(id));

    const { data, error } = await supabase
    .from('images')
    .select()
    .in("id", ids)
    .order('id', { ascending: false })

    res.send(JSON.stringify(data))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;