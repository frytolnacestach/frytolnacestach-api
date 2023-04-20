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
			iam: req.body.iam,
			donate: req.body.donate
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