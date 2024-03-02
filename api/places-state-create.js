import { createClient } from '@supabase/supabase-js'

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    try {
        const { error } = await supabase
            .from('places_states')
            .insert({
                id_continent: req.body.id_continent,
                id_city_main: req.body.id_city_main,
                id_image_cover: req.body.id_image_cover,
                id_image_hero: req.body.id_image_hero,
                ids_neighboring_countries: parseJson(req.body.ids_neighboring_countries),
                type_place: req.body.type_place,
                slug: req.body.slug,
                name: req.body.name,
                name_original: req.body.name_original,
                information_chatgpt: req.body.information_chatgpt,
                information_author: parseJson(req.body.information_author),
                mpz: req.body.mpz,
                tld: req.body.tld,
                area: req.body.area,
                population: req.body.population,
                phone_prefix: req.body.phone_prefix,
                phone_numbers_emergency: parseJson(req.body.phone_numbers_emergency),
                currency: JSON.parse(req.body.currency),
                seo_tags: parseJson(req.body.seo_tags),
                money_prices: parseJson(req.body.money_prices),
                people_religion: parseJson(req.body.people_religion),
                people_nationality: parseJson(req.body.people_nationality),
                visitors_entry: parseJson(req.body.visitors_entry),
                coordinates: parseJson(req.body.coordinates),
                zoom: parseJson(req.body.zoom),
                affiliate: parseJson(req.body.affiliate),
                alerts: parseJson(req.body.alerts),
                organization: parseJson(req.body.organization),
                apps: parseJson(req.body.apps),
                links: parseJson(req.body.links),
                language_phrases: parseJson(req.body.language_phrases),
                facts_place: parseJson(req.body.facts_place),
                setting_top: req.body.setting_top
            })

        return res.status(201).send("Create State")
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

function parseJson(value) {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error parsing JSON: ${value}`);
        return null;
    }
}

module.exports = router