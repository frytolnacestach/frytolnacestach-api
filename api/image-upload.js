const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const FTPClient = require('ftp');

router.use(fileUpload());


const FTPHost = process.env.FTP_IMAGE_HOST
const FTPUser = process.env.FTP_IMAGE_USER
const FTPPass = process.env.FTP_IMAGE_PASS

router.post('/', async (req, res) => {
    let client;

    try {
        const image = req.files.image;

        client = new FTPClient();
        client.connect({
            host: FTPHost,
            user: FTPUser,
            password: FTPPass,
        });

        client.on('ready', () => {
            client.cwd('/subdoms/image/storage/aaatest', (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při přepnutí adresáře na FTP serveru.');
                }

                client.put(image.data, image.name, (error) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Chyba při nahrávání obrázku na FTP server.');
                    }

                    client.end();
                    return res.status(201).send(message);
                });
            });
        });

        client.on('error', (error) => {
            console.error(error);
            return res.status(500).send('Chyba při připojování k FTP serveru.');
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
    }
  });

module.exports = router;