import { createClient } from '@supabase/supabase-js'

const express = require("express");
const cors = require('cors');
const router = express.Router();

const app = express();
app.use(cors());

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
	try {

		const { data, error } = await supabase
		.from('base')
		.update({
			iam: "Ahoj, jmenuji se Michal. V osobním životě podnikám jako webový kódér ale už od mala mě to táhlo k natáčení a bavilo mě cestovat a tak jsem tyto dvě věci spojil a v roce 2018 založil Frytol na cestách. Nejdříve jsem se zaměřoval pouze na cestování ale postupně jsem začal točit i názorová videa nebo také stavění Lega.",
			donate: "Podpořit mě můžetě samotním sledování, odběrem a sdílením mé tvorby. Každa reakce v podobě lajku nebo komentáře je dúležitá a uspokoji algoritmus YouTube nebo jiné platformy. Pro ty ostatní co by mě chtěli podpořit finančně jsem založil Patreon."
		})
		.eq('id', 1)

		res.send(JSON.stringify(data))

	} catch (error) {

		console.error(error);
		return res.status(500).send("Server error");

	}
});

app.use(router);

module.exports = app;