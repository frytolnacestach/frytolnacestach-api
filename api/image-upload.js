const express = require('express');
const router = express.Router();

const FTPClient = require('basic-ftp');

const FTPHost = process.env.FTP_IMAGE_HOST
const FTPUser = process.env.FTP_IMAGE_USER
const FTPPass = process.env.FTP_IMAGE_PASS

router.get('/', async (req, res) => {
    try {
      const client = new FTPClient();
  
      await client.access({
        host: FTPHost,
        user: FTPUser,
        password: FTPPass,
        port: 21,
      });
  
      client.close();
  
      return res.status(200).send('Připojení k FTP serveru bylo úspěšné. ftp:' + FTPHost);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při připojování k FTP serveru. ftp:' + FTPHost);
    }
  });

/*
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

module.exports = router;