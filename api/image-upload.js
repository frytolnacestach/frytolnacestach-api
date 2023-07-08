const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const ftp = require('basic-ftp');

router.use(fileUpload());


const FTPHost = process.env.FTP_IMAGE_HOST
const FTPUser = process.env.FTP_IMAGE_USER
const FTPPass = process.env.FTP_IMAGE_PASS

router.get('/', async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true

    console.log("router")

    try {
        console.log("try")
        await client.access({
            host: FTPHost,
            user: FTPUser,
            password: FTPPass,
            secure: false
        })
        //console.log(await client.list())

        return res.status(201).send("ftp je v pořádku");
      
    } catch (error) {
        console.log("Error")
      console.error(error);
      return res.status(500).send('Chyba při připojování k FTP serveru OUT. ftpH:' + FTPHost + 'ftpU:' + FTPUser + 'ftpP:' + FTPPass);
    }
  });

module.exports = router;


/*

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

                    client.list((error, files) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send('Chyba při získávání seznamu souborů z FTP serveru.');
                        }

                        const fileList = files.map(file => file.name).join('\n');
                        const message = 'Seznam souborů na FTP serveru:\n' + fileList;

                        client.end();
                        return res.status(201).send(message);
                    });
                });
            });
        });

        client.on('error', (error) => {
            console.error(error);
            return res.status(500).send('Chyba při připojování k FTP serveru.');
        });


        //await client.delete('/subdoms/image/storage/aaatest/test_raw2.png');

        //await client.cd('/subdoms/image/storage/aaatest');
        //await client.put(image.data, image.name);

        //const response = await client.raw('getreply');

        //const files = await client.list();

        //const fileList = files.map(file => file.name).join('\n');
      

      //return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server. odpověd:' + JSON.stringify(response));
      //return res.status(201).send('Obrázek byl úspěšně nahrán na jiný server. odpověd:' + fileList);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Chyba při nahrávání obrázku na jiný server.');
    }
  });*/


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