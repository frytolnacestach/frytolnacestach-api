import { createClient } from '@supabase/supabase-js'

const express = require("express");
const router = express.Router();

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/', async (req, res) => {
  try {

    const { count: placesContinentsCount, error: placesContinentsCountError } = await supabase
        .from('places_continents')
        .select('*', { count: 'exact', head: true })

    const { count: placesStatesCount, error: placesStatesCountError } = await supabase
      .from('places_states')
      .select('*', { count: 'exact', head: true })

    const { count: placesRegionsCount, error: placesRegionsCountError } = await supabase
      .from('places_regions')
      .select('*', { count: 'exact', head: true })

    const { count: placesCitiesCount, error: placesCitiesCountError } = await supabase
      .from('places_cities')
      .select('*', { count: 'exact', head: true })

    const { count: placesSpotsCount, error: placesSpotsCountError } = await supabase
      .from('places_spots')
      .select('*', { count: 'exact', head: true })

    const places = {
        places_continents: placesContinentsCount,
        places_states:  placesStatesCount,
        places_regions: placesRegionsCount,
        places_cities: placesCitiesCount,
        places_spots: placesSpotsCount
    }

    res.send(JSON.stringify(places))

  } catch (error) {

    console.error(error);
    return res.status(500).send("Server error");
    
  }
});

module.exports = router;
