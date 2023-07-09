const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const FTPClient = require('ftp');

router.use(fileUpload());

const FTPHost = process.env.FTP_IMAGE_HOST;
const FTPUser = process.env.FTP_IMAGE_USER;
const FTPPass = process.env.FTP_IMAGE_PASS;

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

const resizeAndSaveImage = async (inputPath, outputPath, width, height, suffix) => {
    const image = sharp(inputPath);
    const resizedImage = await image.resize({ width: width, height: height, fit: 'contain' }).webp({ quality: 80 });
    await resizedImage.toFile(outputPath);
};

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

                client.put(image.data, image.name, async (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při nahrávání obrázku na FTP server.');
                }

                // Logika pro generování obrázků
                const originalImagePath = path.join(outputDirPath, `${image.name}.webp`);
                await resizeAndSaveImage(originalImagePath, originalImagePath, null, null, '');
                for (const sizeObj of sizes) {
                    const width = sizeObj.width;
                    const height = sizeObj.height;
                    const prefix = sizeObj.prefix || '';
                    const suffix = sizeObj.suffix || '';
                    const outputImagePath = path.join(outputDirPath, `${prefix}${path.parse(image.name).name}-${width ? width : height}${suffix}.webp`);
                    await resizeAndSaveImage(originalImagePath, outputImagePath, width, height, suffix);
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

module.exports = router;
