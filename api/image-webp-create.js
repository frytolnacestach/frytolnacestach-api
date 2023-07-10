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
        const image = req.files.image;

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

                
                    
                    // Vytvoření nové verze obrázku ve formátu WebP
                    const webpImageData = await convertToWebP(image.data);

                    // Nahrání nového obrázku ve formátu WebP na FTP server
                    client.put(webpImageData, getWebPFileName(image.name), async (error) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send('Chyba při nahrávání obrázku ve formátu WebP na FTP server.');
                        }

                        for (const size of sizes) {
                            await uploadResizedImage(client, image.data, image.name, size);
                          }

                        
                        client.end();
                        return res.status(201).send('Obrázek byl úspěšně nahrán na FTP server.');
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

// Funkce pro opakování nahrávání zmenšeného obrázku ve formátu WebP na FTP server
async function uploadResizedImage(client, imageData, originalFileName, size) {
    const resizedImageData = await resizeImage(imageData, size);
    const resizedImageName = getResizedImageName(originalFileName, size);
  
    return new Promise((resolve, reject) => {
      client.put(resizedImageData, resizedImageName, async (error) => {
        if (error) {
          console.error(error);
          console.error(`Chyba při nahrávání obrázku ve formátu WebP (${resizedImageName}) na FTP server.`);
          // Opakování nahrávání
          await uploadResizedImage(client, imageData, originalFileName, size).then(resolve).catch(reject);
        } else {
          resolve();
        }
      });
    });
  }

// Funkce pro změnu velikosti obrázku a převod do formátu WebP
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
  
    return await sharpObject.webp().toBuffer();
}
  
// Funkce pro generování názvu zmenšeného obrázku ve formátu WebP
function getResizedImageName(originalFileName, size) {
    const { prefix, suffix, width, height } = size;
    const extension = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, extension);
    return `${prefix}${baseName}-${width ? width : height}${suffix || ''}.webp`;
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