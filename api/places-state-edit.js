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
            id_continent: req.body.id_continent,
            id_city_main: req.body.id_city_main,
            id_image_cover: req.body.id_image_cover,
            id_image_hero: req.body.id_image_hero,
            ids_neighboring_countries: req.body.ids_neighboring_countries,
            type_place: req.body.type_place,
			slug: req.body.slug,
            name: req.body.name,
            information_chatgpt: req.body.information_chatgpt,
			mpz: req.body.mpz,
			tld: req.body.tld,
            area: req.body.area,
            population: req.body.population,
            phone_prefix: req.body.phone_prefix,
            phone_numbers_emergency: req.body.phone_numbers_emergency,
            currency_name: req.body.currency_name,
            currency_code: req.body.currency_code,
            money_prices: req.body.money_prices,
            people_religion: req.body.people_religion,
            people_nationality: req.body.people_nationality,
            visitors_entry: req.body.visitors_entry,
            coordinates: req.body.coordinates,
            zoom: req.body.zoom,
            affiliate: req.body.affiliate,
            alerts: req.body.alerts
		})
		.eq('slug', req.body.slug)

		res.send(JSON.stringify(data))
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}

});

module.exports = router;