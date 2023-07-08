const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

const FTPSClient = require('ftps');

const FTPHost = process.env.FTP_IMAGE_HOST
const FTPUser = process.env.FTP_IMAGE_USER
const FTPPass = process.env.FTP_IMAGE_PASS

/*
router.get('/', async (req, res) => {
    try {

        const client = new FTPSClient({
            host: FTPHost,
            username: FTPUser,
            password: FTPPass,
            protocol: 'ftp',
            port: 21,
          });
      
          await client.ls(); // Testování příkazu listování souborů      
  
      return res.status(200).send('Připojení k FTP serveru bylo úspěšné. ftpH:' + FTPHost + 'ftpU:' + FTPUser + 'ftpP:' + FTPPass);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při připojování k FTP serveru. ftpH:' + FTPHost + 'ftpU:' + FTPUser + 'ftpP:' + FTPPass);
    }
  });
*/


/*
router.post('/', async (req, res) => {
    try {
      const image = req.files.image;
  
      const client = new FTPSClient({
        host: FTPHost,
        username: FTPUser,
        password: FTPPass,
        protocol: 'ftp',
        port: 21,
      });
  
  
      //await client.ls(); // Testování příkazu listování souborů   
      await client.cd('/storage/__test');
      await client.put(image.path, image.name);
  
      client.close();
  
      return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
    }
  });
*/

router.post('/', async (req, res) => {
    try {
      const image = req.files.image;
    
      const client = new FTPSClient({
        host: FTPHost,
        username: FTPUser,
        password: FTPPass,
        protocol: 'ftp',
        port: 21,
      });
    
      await client.cd('/subdoms/image/storage/__test');
      //await client.put(image.data, image.name); // změna z 'image.path' na 'image.data'
    
      client.close();
    
      return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
    }
  });

module.exports = router;