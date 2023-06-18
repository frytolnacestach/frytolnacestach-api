const express = require('express')
const cors = require('cors');
const app = express()
const path = require('path');
const axios = require('axios');
const router = express.Router();


//body-paser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());


app.use(express.json({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//CONSTS
//user
const users = require("./api/users");
const user = require("./api/user");
const userRegistration = require("./api/user-registration");
const userActivation = require("./api/user-activation");
const userActivationEmail = require("./api/user-activation-email");
const userAuthentication = require("./api/user-authentication");
const userLogin = require("./api/user-login");
const userLoginCheck = require("./api/user-login-check");
const userProfile = require("./api/user-profile");
const userProfileEdit = require("./api/user-profile-edit");
const userVisitedPlace = require("./api/user-visited-place");
const userVisitedPlaceEdit = require("./api/user-visited-place-edit");
const userVisitedPlaceIDuser = require("./api/user-visited-place-id-user");
//user - post

//base
const base = require("./api/base");
//base - post
const baseEdit = require("./api/base-edit");

//top
const topPlaces = require("./api/top-places");

//login
const login = require("./api/login");

//platform
const platforms = require("./api/platforms");
const platform = require("./api/platform");
//platform - post
const platformCreate = require("./api/platform-create");
const platformEdit = require("./api/platform-edit");

//image
const images = require("./api/images");
const imagesArray = require("./api/images-array");
const imageID = require("./api/image-id");

//video
const videos = require("./api/videos");
const videosIDcontinent = require("./api/videos-id-continent");
const videosIDstate = require("./api/videos-id-state");
const videosIDregion = require("./api/videos-id-region");
const videosIDcity = require("./api/videos-id-city");
const videosIDspot = require("./api/videos-id-spot");
const video = require("./api/video");
const videoLast = require("./api/video-last");
//video - post
const videoCreate = require("./api/video-create");
const videoEdit = require("./api/video-edit");

//post
const posts = require("./api/posts");
const postsIDcontinent = require("./api/posts-id-continent");
const postsIDstate = require("./api/posts-id-state");
const postsIDregion = require("./api/posts-id-region");
const postsIDcity = require("./api/posts-id-city");
const postsIDspot = require("./api/posts-id-spot");
const post = require("./api/post");
const postLast = require("./api/post-last");
//post - post
const postCreate = require("./api/post-create");
const postEdit = require("./api/post-edit");

//brands
const brands = require("./api/brands");
const brandsArray = require("./api/brands-array");
const brandsIDstate = require("./api/brands-id-state");
const brand = require("./api/brand");
//brands - post
const brandCreate = require("./api/brand-create");
const brandEdit = require("./api/brand-edit");

//foods
const foods = require("./api/foods");
const foodsArray = require("./api/foods-array");
const foodsIDstate = require("./api/foods-id-state");
const food = require("./api/food");
//foods - post
const foodCreate = require("./api/food-create");
const foodEdit = require("./api/food-edit");

//fauna
const faunas = require("./api/faunas");
const faunasArray = require("./api/faunas-array");
const faunasIDstate = require("./api/faunas-id-state");
const fauna = require("./api/fauna");
//fauna - post
const faunaCreate = require("./api/fauna-create");
const faunaEdit = require("./api/fauna-edit");

//flora
const floras = require("./api/floras");
const florasArray = require("./api/floras-array");
const florasIDstate = require("./api/floras-id-state");
const flora = require("./api/flora");
//flora - post
const floraCreate = require("./api/flora-create");
const floraEdit = require("./api/flora-edit");

//travel-dictionary
const travelDictionaries = require("./api/travel-dictionaries");
const travelDictionary = require("./api/travel-dictionary");
//travel-dictionary - post
const travelDictionaryCreate = require("./api/travel-dictionary-create");
const travelDictionaryEdit = require("./api/travel-dictionary-edit");

//places - continent
const placesContinents = require("./api/places-continents");
const placesContinentsArray = require("./api/places-continents-array");
const placesContinent = require("./api/places-continent");
const placesContinentID = require("./api/places-continent-id");
//places - continent - post
const placesContinentCreate = require("./api/places-continent-create");
const placesContinentEdit = require("./api/places-continent-edit");

//places - state
const placesStates = require("./api/places-states");
const placesStatesArray = require("./api/places-states-array");
const placesStatesContinent = require("./api/places-states-continent");
const placesState = require("./api/places-state");
const placesStateID = require("./api/places-state-id");
//places - state - post
const placesStateCreate = require("./api/places-state-create");
const placesStateEdit = require("./api/places-state-edit");

//places - region
const placesRegions = require("./api/places-regions");
const placesRegionsArray = require("./api/places-regions-array");
const placesRegion = require("./api/places-region");
const placesRegionID = require("./api/places-region-id");
//places - region - post
const placesRegionCreate = require("./api/places-region-create");
const placesRegionEdit = require("./api/places-region-edit");

//places - city
const placesCities = require("./api/places-cities");
const placesCitiesArray = require("./api/places-cities-array");
const placesCitiesInitial = require("./api/places-cities-initial");
const placesCitiesIDstate = require("./api/places-cities-id-state");
const placesCity = require("./api/places-city");
const placesCityID = require("./api/places-city-id");
//places - city - post
const placesCityCreate = require("./api/places-city-create");
const placesCityEdit = require("./api/places-city-edit");

//places - spot
const placesSpots = require("./api/places-spots");
const placesSpotsArray = require("./api/places-spots-array");
const placesSpot = require("./api/places-spot");
const placesSpotID = require("./api/places-spot-id");
//places - spot - post
const placesSpotCreate = require("./api/places-spot-create");
const placesSpotEdit = require("./api/places-spot-edit");

//event
const events = require("./api/events");
const event = require("./api/event");
//event - post
const eventCreate = require("./api/event-create");
const eventEdit = require("./api/event-edit");
//CONSTS - END


//API
//api - user
app.use("/api/users", users);
app.use("/api/user", user);
app.use("/api/user-registration", userRegistration);
app.use("/api/user-activation", userActivation);
app.use("/api/user-activation-email", userActivationEmail);
app.use("/api/user-authentication", userAuthentication);
app.use("/api/user-login", userLogin);
app.use("/api/user-login-check", userLoginCheck);
app.use("/api/user-profile", userProfile);
app.use("/api/user-profile-edit", userProfileEdit);
app.use("/api/user-visited-place", userVisitedPlace);
app.use("/api/user-visited-place-edit", userVisitedPlaceEdit);
app.use("/api/user-visited-place-id-user", userVisitedPlaceIDuser);
//api - user - post

//api - base
app.use("/api/base", base);
//api - base - post
app.use("/api/base-edit", baseEdit);

//top
app.use("/api/top-places", topPlaces);

//api - login
app.use("/api/login", login);

//api - platform
app.use("/api/platforms", platforms);
app.use("/api/platform", platform);
//api - platform - post
app.use("/api/platform-create", platformCreate);
app.use("/api/platform-edit", platformEdit);

//api - image
app.use("/api/images", images);
app.use("/api/images-array", imagesArray);
app.use("/api/image-id", imageID);

//api - video
app.use("/api/videos", videos);
app.use("/api/videos-id-continent", videosIDcontinent);
app.use("/api/videos-id-state", videosIDstate);
app.use("/api/videos-id-region", videosIDregion);
app.use("/api/videos-id-city", videosIDcity);
app.use("/api/videos-id-spot", videosIDspot);
app.use("/api/video", video);
app.use("/api/video-last", videoLast);
//api - video - post
app.use("/api/video-create", videoCreate);
app.use("/api/video-edit", videoEdit);

//api - post
app.use("/api/posts", posts);
app.use("/api/posts-id-continent", postsIDcontinent);
app.use("/api/posts-id-state", postsIDstate);
app.use("/api/posts-id-region", postsIDregion);
app.use("/api/posts-id-city", postsIDcity);
app.use("/api/posts-id-spot", postsIDspot);
app.use("/api/post", post);
app.use("/api/post-last", postLast);
//api - post - post
app.use("/api/post-create", postCreate);
app.use("/api/post-edit", postEdit);

//api - brands
app.use("/api/brands", brands);
app.use("/api/brands-array", brandsArray);
app.use("/api/brands-id-state", brandsIDstate);
app.use("/api/brand", brand);
//api - brands - post
app.use("/api/brand-create", brandCreate);
app.use("/api/brand-edit", brandEdit);

//api - foods
app.use("/api/foods", foods);
app.use("/api/foods-array", foodsArray);
app.use("/api/foods-id-state", foodsIDstate);
app.use("/api/food", food);
//api - foods - post
app.use("/api/food-create", foodCreate);
app.use("/api/food-edit", foodEdit);

//api - fauna
app.use("/api/faunas", faunas);
app.use("/api/faunas-array", faunasArray);
app.use("/api/faunas-id-state", faunasIDstate);
app.use("/api/fauna", fauna);
//api - fauna - post
app.use("/api/fauna-create", faunaCreate);
app.use("/api/fauna-edit", faunaEdit);

//api - flora
app.use("/api/floras", floras);
app.use("/api/floras-array", florasArray);
app.use("/api/floras-id-state", florasIDstate);
app.use("/api/flora", flora);
//api - flora - post
app.use("/api/flora-create", floraCreate);
app.use("/api/flora-edit", floraEdit);

//api - travel-dictionary
app.use("/api/travel-dictionaries", travelDictionaries);
app.use("/api/travel-dictionary", travelDictionary);
//api - travel-dictionary - post
app.use("/api/travel-dictionary-create", travelDictionaryCreate);
app.use("/api/travel-dictionary-edit", travelDictionaryEdit);

//api - places - continent
app.use("/api/places-continents", placesContinents);
app.use("/api/places-continents-array", placesContinentsArray);
app.use("/api/places-continent", placesContinent);
app.use("/api/places-continent-id", placesContinentID);
//api - places - continent - post
app.use("/api/places-continent-create", placesContinentCreate);
app.use("/api/places-continent-edit", placesContinentEdit);

//api - places - state
app.use("/api/places-states", placesStates);
app.use("/api/places-states-array", placesStatesArray);
app.use("/api/places-states-continent", placesStatesContinent);
app.use("/api/places-state", placesState);
app.use("/api/places-state-id", placesStateID);
//api - places - state - post
app.use("/api/places-state-create", placesStateCreate);
app.use("/api/places-state-edit", placesStateEdit);

//api - places - region
app.use("/api/places-regions", placesRegions);
app.use("/api/places-regions-array", placesRegionsArray);
app.use("/api/places-region", placesRegion);
app.use("/api/places-region-id", placesRegionID);
//api - places - region - post
app.use("/api/places-region-create", placesRegionCreate);
app.use("/api/places-region-edit", placesRegionEdit);

//api - places - city
app.use("/api/places-cities", placesCities);
app.use("/api/places-cities-array", placesCitiesArray);
app.use("/api/places-cities-initial", placesCitiesInitial);
app.use("/api/places-cities-id-state", placesCitiesIDstate);
app.use("/api/places-city", placesCity);
app.use("/api/places-city-id", placesCityID);
//api - places - city - post
app.use("/api/places-city-create", placesCityCreate);
app.use("/api/places-city-edit", placesCityEdit);

//api - places - spot
app.use("/api/places-spots", placesSpots);
app.use("/api/places-spots-array", placesSpotsArray);
app.use("/api/places-spot", placesSpot);
app.use("/api/places-spot-id", placesSpotID);
//api - places - spot - post
app.use("/api/places-spot-create", placesSpotCreate);
app.use("/api/places-spot-edit", placesSpotEdit);

//api - event
app.use("/api/events", events);
app.use("/api/event", event);
//api - eventy - post
app.use("/api/event-create", eventCreate);
app.use("/api/event-edit", eventEdit);
//API - END


//pages
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/index.html'));
});
router.get('/docs',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/docs.html'));
});

//CSS
router.get('/public/css/main.css',function(req,res){
    res.sendFile(path.join(__dirname+'/public/css/main.css'));
});

//JS
router.get('/public/js/js_m-hamburger.js',function(req,res){
    res.sendFile(path.join(__dirname+'/public/js/js_m-hamburger.js'));
});
router.get('/public/js/js_o-cookies-dialog.js',function(req,res){
    res.sendFile(path.join(__dirname+'/public/js/js_o-cookies-dialog.js'));
});

//IMG
router.get('/public/img/_base/hero.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/_base/hero.png'));
});
router.get('/public/img/_base/logotype.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/_base/logotype.png'));
});

//Favicons
router.get('/public/img/favicons/apple-touch-icon.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/apple-touch-icon.png'));
});
router.get('/public/img/favicons/favicon-32x32.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon-32x32.png'));
});
router.get('/public/img/favicons/favicon-16x16.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon-16x16.png'));
});
router.get('/public/img/favicons/site.webmanifest',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/site.webmanifest'));
});
router.get('/public/img/favicons/android-chrome-192x192.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/android-chrome-192x192.png'));
});
router.get('/public/img/favicons/android-chrome-512x512.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/android-chrome-512x512.png'));
});
router.get('/public/img/favicons/favicon.ico',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/favicon.ico'));
});
router.get('/public/img/favicons/browserconfig.xml',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/favicons/browserconfig.xml'));
});

app.use('/', router);
const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))