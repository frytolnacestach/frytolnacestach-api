const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  try {
    // Příjem obrázku z frontendu
    const image = req.files.image;

    // Nahrání obrázku na jiný server
    const response = await fetch('https://image.frytolnacestach.cz/storage/__test', {
      method: 'POST',
      body: image.data,
      headers: {
        'Content-Type': image.mimetype,
      },
    });

    if (response.ok) {
      return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server.');
    } else {
      return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
