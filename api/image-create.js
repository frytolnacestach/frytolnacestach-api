import { createClient } from '@supabase/supabase-js'

const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const FTPClient = require('ftp');

router.use(fileUpload());

const FTPHost = process.env.FTP_IMAGE_HOST;
const FTPUser = process.env.FTP_IMAGE_USER;
const FTPPass = process.env.FTP_IMAGE_PASS;

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post('/', async (req, res) => {
    let client;

    const dirPath = '/subdoms/image/storage';
    
    let dirPathFinal = dirPath + req.body.source

    try {
        const image = req.files.image;

        client = new FTPClient();
        client.connect({
            host: FTPHost,
            user: FTPUser,
            password: FTPPass,
        });

        client.on('ready', async () => {
            client.cwd(dirPathFinal, async (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Chyba při přepnutí adresáře na FTP serveru.');
                }

                // Nahrání originálního obrázku na FTP
                client.put(image.data, image.name, async (error) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Chyba při nahrávání původního obrázku na FTP server.');
                    }

					try {
						const { error } = await supabase
						.from('images')
						.insert({ 
							name: req.body.name,
							source: req.body.source,
							type: req.body.type,
							author: req.body.author
						})
				
						return res.status(201).send("Create images");
					} catch (error) {
						console.error(error);
						return res.status(500).send("Server error");
					}
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