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

                        // Vytvoření a nahrání responzivních variant obrázku ve formátu WebP
                        for (const size of sizes) {
                            const resizedImageData = await resizeImage(webpImagePath, size.width, size.height);
                            const variantFileName = getVariantFileName(image.name, size);
                            client.put(resizedImageData, variantFileName, async (error) => {
                                if (error) {
                                    console.error(error);
                                    return res.status(500).send(`Chyba při nahrávání responzivní varianty ${variantFileName} na FTP server.`);
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

// Funkce pro konverzi obrázku na formát WebP
async function convertToWebP(inputData, outputPath) {
  await sharp(inputData)
    .toFormat('webp')
    .toFile(outputPath);
}

// Funkce pro změnu velikosti obrázku
async function resizeImage(inputPath, width, height) {
  return await sharp(inputPath)
    .resize(width, height)
    .toBuffer();
}

// Funkce pro získání názvu souboru ve formátu WebP
function getWebPFileName(originalFileName) {
  const extension = path.extname(originalFileName);
  const baseName = path.basename(originalFileName, extension);
  return baseName + '.webp';
}

// Funkce pro získání názvu souboru responzivní varianty
function getVariantFileName(originalFileName, size) {
  const extension = path.extname(originalFileName);
  const baseName = path.basename(originalFileName, extension);
  const suffix = size.suffix ? size.suffix : '';
  const variantFileName = `${size.prefix}${baseName}${suffix}${extension}`;
  return variantFileName;
}


module.exports = router;



// Převod a přenos souboru do formátu WebP
//await convertToWebPAndUpload(image.data, image.name);


// named webp variant
//const originalWebPImagePath = path.join(outputDirPath, `${image.name}.webp`);
// Convert to WebP
//await convertToWebP(originalWebPImagePath);

// save to webp
//await resizeAndSaveImage(image.data, originalImagePath, null, null);

// save to webp - resizes
/*for (const sizeObj of sizes) {
    const width = sizeObj.width;
    const height = sizeObj.height;
    const prefix = sizeObj.prefix || '';
    const suffix = sizeObj.suffix || '';
    const outputImagePath = path.join(outputDirPath, `${prefix}${path.parse(image.name).name}-${width ? width : height}${suffix}.webp`);
    await resizeAndSaveImage(originalImagePath, outputImagePath, width, height, suffix);
}*/

/*

const convertToWebP = async (imagePath) => {
    const outputImagePath = imagePath;
  
    await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(path.join(outputDirPath, outputImagePath));
};

const resizeAndSaveImage = async (imageData, outputPath, width, height) => {
    const image = sharp(imageData);
    const resizedImage = await image.resize({ width: width, height: height, fit: 'contain' }).webp({ quality: 80 });
    await resizedImage.toFile(outputPath);
};



const inputDirPath = '/subdoms/image/storage/aaatest';
const outputDirPath = '/subdoms/image/storage/aaatest';

const sizes = [
    { width: 100, height: null, prefix: "h-" },
    { width: 108, height: null, prefix: "h-" },
    { width: 126, height: null, prefix: "h-" },
    { width: 172, height: null, prefix: "h-" },
    { width: 192, height: null, prefix: "h-" },
    { width: 220, height: null, prefix: "h-" },
    { width: 258, height: null, prefix: "h-" },
    { width: 286, height: null, prefix: "h-" },
    { width: 310, height: null, prefix: "h-" },
    { width: 312, height: null, prefix: "h-" },
    { width: 320, height: null, prefix: "h-" }
];




const convertToWebPAndUpload = async (imageData, imageName) => {
  const outputImagePath = `${imageName}.webp`;

  await sharp(imageData)
    .webp({ quality: 80 })
    .toFile(outputImagePath);

  // Přenos souboru WebP na FTP server
  client.put(fs.createReadStream(outputImagePath), outputImagePath, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Chyba při nahrávání obrázku ve formátu WebP na FTP server.');
    }

    console.log('Obrázek ve formátu WebP byl úspěšně nahrán na FTP server.');
    fs.unlinkSync(outputImagePath); // Smazat výsledný soubor WebP po nahrání na FTP server
  });
};

*/