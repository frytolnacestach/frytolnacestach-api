import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
  try {

    const { placesContinentsCount, error: placesContinentsCountError } = await supabase
        .from('places_continents')
        .select('*', { count: 'exact', head: true })

    /*const { count: placesStatesCount, error: placesStatesCountError } = await supabase
      .from('places_states')
      .select('*', { count: 'exact' })

    const { count: placesRegionsCount, error: placesRegionsCountError } = await supabase
      .from('places_regions')
      .select('*', { count: 'exact' })

    const { count: placesCitiesCount, error: placesCitiesCountError } = await supabase
      .from('places_cities')
      .select('*', { count: 'exact' })

    const { count: placesSpotsCount, error: placesSpotsCountError } = await supabase
      .from('places_spots')
      .select('*', { count: 'exact' })*/

    const places = {
        places_continents: placesContinentsCount[0].count,
        //places_states:  placesStatesCount[0].count,
        //places_regions: placesRegionsCount[0].count,
        //places_cities: placesCitiesCount[0].count,
        //places_spots: placesSpotsCount[0].count
    }

    res.send(JSON.stringify(places))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;
