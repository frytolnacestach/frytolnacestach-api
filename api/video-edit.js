import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {

	try {
		const { data, error } = await supabase
		.from('videos')
		.update({
			slug: req.body.slug,
			platform: req.body.platform,
			title: req.body.title,
			url: req.body.url
		})
		.eq('slug', req.body.slug)

		res.send(JSON.stringify(data))
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}

});

module.exports = router;