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
			slug: req.body.body.slug,
            name: req.body.body.name,
            area: req.body.body.area,
            population: req.body.body.population,
            population_density: req.body.body.populationDensity,
            number_states: req.body.body.states
		})
		.eq('slug', req.body.body.slug)

		res.send(JSON.stringify(data))

	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
});

module.exports = router;