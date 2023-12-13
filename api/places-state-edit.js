import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

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
                ids_neighboring_countries: JSON.parse(req.body.ids_neighboring_countries),
                type_place: req.body.type_place,
                slug: req.body.slug,
                name: req.body.name,
                information_chatgpt: req.body.information_chatgpt,
                information_author: JSON.parse(req.body.information_author),
                mpz: req.body.mpz,
                tld: req.body.tld,
                area: req.body.area,
                population: req.body.population,
                phone_prefix: req.body.phone_prefix,
                phone_numbers_emergency: JSON.parse(req.body.phone_numbers_emergency),
                currency_name: req.body.currency_name,
                currency_code: req.body.currency_code,
                seo_tags: JSON.parse(req.body.seo_tags),
                money_prices: JSON.parse(req.body.money_prices),
                people_religion: JSON.parse(req.body.people_religion),
                people_nationality: JSON.parse(req.body.people_nationality),
                visitors_entry: JSON.parse(req.body.visitors_entry),
                coordinates: JSON.parse(req.body.coordinates),
                zoom: JSON.parse(req.body.zoom),
                affiliate: JSON.parse(req.body.affiliate),
                alerts: JSON.parse(req.body.alerts),
                organization: JSON.parse(req.body.organization),
                apps: JSON.parse(req.body.apps),
                links: JSON.parse(req.body.links),
                language_phrases: JSON.parse(req.body.language_phrases),
                facts_place: JSON.parse(req.body.facts_place)
            })
            .eq('slug', req.body.slug)

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router