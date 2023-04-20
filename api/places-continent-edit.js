import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
	
	try {
		const { data, error } = await supabase
		.from('places_continents')
		.update({
			slug: req.body.slug,
            name: req.body.name,
            area: req.body.area,
            population: req.body.population,
            population_density: req.body.populationDensity,
            number_states: req.body.states,
            information_chatgpt: req.body.information_chatgpt,
            image_cover: req.body.image_cover,
            image_hero: req.body.image_hero
		})
		.eq('slug', req.body.slug)

		res.send(JSON.stringify(data))
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
	
});

module.exports = router;