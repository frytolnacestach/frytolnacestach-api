import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
	
	try {
		const { data, error } = await supabase
		.from('places_states')
		.update({
			slug: req.body.slug,
			mpz: req.body.mpz,
			tld: req.body.tld,
            name: req.body.name,
            area: req.body.area,
            population: req.body.population,
            information_chatgpt: req.body.information_chatgpt,
            id_image_cover: req.body.id_image_cover,
            id_image_hero: req.body.id_image_hero
		})
		.eq('slug', req.body.slug)

		res.send(JSON.stringify(data))
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}

});

module.exports = router;