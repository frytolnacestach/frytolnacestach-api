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

const inputDirPath = '/subdoms/image/storage/aaatest';

const sizes = [
    { width: 330, height: null, prefix: "h-" },
    { width: 360, height: null, prefix: "h-" },
    { width: 420, height: null, prefix: "h-" },
    { width: 536, height: null, prefix: "h-" },
    { width: 728, height: null, prefix: "h-" },
    { width: 780, height: null, prefix: "h-" },
    { width: 900, height: null, prefix: "h-" },
    { width: 952, height: null, prefix: "h-" },
    { width: 1248, height: null, prefix: "h-" },
    { width: null, height: 172, prefix: "s-" },
    { width: null, height: 186, prefix: "s-" },
    { width: null, height: 210, prefix: "s-" },
    { width: null, height: 224, prefix: "s-" },
    { width: null, height: 240, prefix: "s-" },
    { width: null, height: 274, prefix: "s-" },
    { width: null, height: 306, prefix: "s-" },
    { width: null, height: 360, prefix: "s-" },
    { width: 330 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 360 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 420 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 536 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 728 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 780 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 900 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 952 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: 1248 * 2, height: null, prefix: "h-", suffix: "-2x" },
    { width: null, height: 172 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 186 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 210 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 224 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 240 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 274 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 306 * 2, prefix: "s-", suffix: "-2x" },
    { width: null, height: 360 * 2, prefix: "s-", suffix: "-2x" }
];

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

        client.on('ready', async () => {
            client.cwd(inputDirPath, async (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při přepnutí adresáře na FTP serveru.');
                }

                // Nahrání původního obrázku na FTP server
                client.put(image.data, image.name, async (error) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Chyba při nahrávání původního obrázku na FTP server.');
                    }

                    
                    // Vytvoření nové verze obrázku ve formátu WebP
                    const webpImageData = await convertToWebP(image.data);

                    // Nahrání nového obrázku ve formátu WebP na FTP server
                    client.put(webpImageData, getWebPFileName(image.name), async (error) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send('Chyba při nahrávání obrázku ve formátu WebP na FTP server.');
                        }

                        for (const size of sizes) {
                            const resizedImageData = await resizeImage(image.data, size);
                            const resizedImageName = getResizedImageName(image.name, size);
                            client.put(resizedImageData, resizedImageName, (error) => {
                              if (error) {
                                console.error(error);
                                return res.status(500).send(`Chyba při nahrávání obrázku ve formátu WebP (${resizedImageName}) na FTP server.`);
                              }
                            });
                          }

                        
                        client.end();
                        return res.status(201).send('Obrázek byl úspěšně nahrán na FTP server.');
                    });
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


// Funkce pro změnu velikosti obrázku
async function resizeImage(imageData, size) {
    const { width, height, prefix, suffix } = size;
  
    let sharpObject = sharp(imageData);
    
    if (width && height) {
      sharpObject = sharpObject.resize(width, height);
    } else if (width) {
      sharpObject = sharpObject.resize(width);
    } else if (height) {
      sharpObject = sharpObject.resize(null, height);
    }
    
    return await sharpObject.toFormat('webp').toBuffer();
  }
  
  // Funkce pro generování názvu zmenšeného obrázku
  function getResizedImageName(originalFileName, size) {
    const { prefix, suffix } = size;
    const extension = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, extension);
    return `${prefix}${baseName}${suffix || ''}${extension}`;
  }
  

// Funkce pro konverzi obrázku na formát WebP
async function convertToWebP(imageData) {
    return await sharp(imageData)
        .toFormat('webp')
        .toBuffer();
}

// Funkce pro získání názvu souboru ve formátu WebP
function getWebPFileName(originalFileName) {
    const extension = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, extension);
    return baseName + '.webp';
}

module.exports = router;