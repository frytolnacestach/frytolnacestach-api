const express = require('express');
const router = express.Router();

const FTPClient = require('basic-ftp');

router.post('/', async (req, res) => {

  try {

    const image = req.files.image;

    const fs = require('fs');
    const util = require('util');
    const stat = util.promisify(fs.stat);

    const imageStats = await stat(image.path);
    const imageSize = imageStats.size;

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
    return res.status(500).send('Chyba při nahrávání obrázku na jiný server. file:');
  }
});

module.exports = router;