const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const FTPClient = require('ftp');

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

router.use(fileUpload());

const FTPHost = process.env.FTP_IMAGE_HOST;
const FTPUser = process.env.FTP_IMAGE_USER;
const FTPPass = process.env.FTP_IMAGE_PASS;


router.post('/', async (req, res) => {
	const imageName = req.query.name
	const imageSource = req.query.source
	const imageWidth = req.query.width
	const imageHeight = req.query.height
	const imagePrefix = req.query.prefix
	const imageSubfix = req.query.subfix

	const dirPath = '/subdoms/image/storage' + imageSource;

    let client;

    try {
        client = new FTPClient();
        client.connect({
            host: FTPHost,
            user: FTPUser,
            password: FTPPass,
        });

        client.on('ready', async () => {
            client.cwd(dirPath, async (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při přepnutí adresáře na FTP serveru.');
                }

                
				client.end();
				return res.status(201).send('Obrázek byl úspěšně nahrán na FTP server.');
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