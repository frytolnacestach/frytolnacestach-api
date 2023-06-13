import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
	
	try {
		const { data, error } = await supabase
		.from('base')
		.update({
			iam: req.body.iam,
			donate: req.body.donate,
			cookies: req.body.cookies,
			conditions: req.body.conditions,
			conditions_user: req.body.conditions_user
		})
		.eq('id', 1)

		res.send(JSON.stringify(data))
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}

});

module.exports = router;