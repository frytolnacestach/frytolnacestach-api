const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const FTPClient = require('ftp');

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const concat = require('concat-stream');

router.use(fileUpload());

const FTPHost = process.env.FTP_IMAGE_HOST;
const FTPUser = process.env.FTP_IMAGE_USER;
const FTPPass = process.env.FTP_IMAGE_PASS;

router.post('/', async (req, res) => {
	const imageTypeCreate = req.query.type_create;
    const imageName = req.query.name;
    const imageSource = req.query.source;
    const imageWidth = parseInt(req.query.width, 10);
    const imageHeight = parseInt(req.query.height, 10);
    const imagePrefix = req.query.prefix;
    const imageSuffix = req.query.suffix;

    const dirPath = '/subdoms/image/storage' + imageSource;
	const fileLoadExtension = imageTypeCreate === 'raw' ? ".jpg" : ".webp";

    let client;

    try {
        client = new FTPClient();
        client.connect({
            host: FTPHost,
            user: FTPUser,
            password: FTPPass,
        });

        client.on('ready', async () => {
			// Přepnutí do správného adresáře v FTP serveru
            client.cwd(dirPath, async (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při přepnutí adresáře na FTP serveru.');
                }

                // Načtení požadovaného obrázku z FTP serveru
                client.get(imageName + fileLoadExtension, async (error, stream) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Chyba při čtení souboru z FTP serveru.');
                    }

                    stream.pipe(concat(async (data) => {

						// Resize and convert
						let webpImageData
						if (imageTypeCreate === "raw") {
							webpImageData = await convertToWebP(data);
						} else {
							const resizedImageData = await resizeImage(data, imageWidth, imageHeight);
							webpImageData = resizedImageData;
						}

                        // Uložení převedeného obrázku zpět na FTP server
                        client.put(webpImageData, getOutputFileName(imageTypeCreate, imageName, imageWidth, imageHeight, imagePrefix, imageSuffix), (error) => {
                            if (error) {
                                console.error(error);
                                return res.status(500).send('Chyba při ukládání souboru na FTP server.');
                            }

                            client.end();
                            return res.status(201).send('Obrázek byl úspěšně převeden na formát WebP a nahrán zpět na FTP server.');
                        });
                    }));
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

// Funkce pro konverzi obrázku na formát WebP
async function convertToWebP(imageData) {
    return await sharp(imageData)
        .toFormat('webp')
        .toBuffer();
}

// Funkce pro změnu velikosti obrázku
async function resizeImage(imageData, width, height) {

	const image = sharp(imageData);
	// Změna velikosti obrázku
	return image
	//return await image.resize({ width: width, height: height, fit: 'contain' }).webp({ quality: 80 }).toBuffer();
}

// Funkce pro generování názvu výstupního souboru
function getOutputFileName(type, baseName, width, height, prefix, suffix) {
	if (type === "raw") {
		return `${baseName}.webp`;
	} else {
		return `${prefix || ''}${baseName}-${width ? width : height}${suffix || ''}.webp`;
	}
}

module.exports = router;