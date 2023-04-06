const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();

//body-paser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//pages
const login = require("./api/login");
const base = require("./api/base");
const baseEdit = require("./api/base-edit");
const placesContinents = require("./api/places-continents");
const placesContinent = require("./api/places-continent");
const placesContinentID = require("./api/places-continent-id");
const placesContinentEdit = require("./api/places-continent-edit");
const placesContinentCreate = require("./api/places-continent-create");
const placesStates = require("./api/places-states");
const placesStatesContinent = require("./api/places-states-continent");
const placesState = require("./api/places-state");
const placesStateID = require("./api/places-state-id");
const placesStateEdit = require("./api/places-state-edit");
const placesStateCreate = require("./api/places-state-create");
const placesCities = require("./api/places-cities");
const placesCitiesState = require("./api/places-cities-state");
const placesCity = require("./api/places-city");
const placesCityID = require("./api/places-city-id");
const placesCityEdit = require("./api/places-city-edit");
const placesCityCreate = require("./api/places-city-create");
const platforms = require("./api/platforms");
const platform = require("./api/platform");
const platformEdit = require("./api/platform-edit");
const platformCreate = require("./api/platform-create");
const videos = require("./api/videos");
const videosIDcontinent = require("./api/videos-id-continent");
const videosIDstate = require("./api/videos-id-state");
const videosIDcity = require("./api/videos-id-city");
const video = require("./api/video");
const videoEdit = require("./api/video-edit");
const videoCreate = require("./api/video-create");
const posts = require("./api/posts");
const post = require("./api/post");
const postEdit = require("./api/post-edit");
const postCreate = require("./api/post-create");

app.use(express.json({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//api - get
app.use("/api/login", login);
app.use("/api/base", base);
app.use("/api/platform", platform);
app.use("/api/platforms", platforms);
app.use("/api/video", video);
app.use("/api/videos", videos);
app.use("/api/videos-id-continet", videosIDcontinent);
app.use("/api/videos-id-state", videosIDstate);
app.use("/api/videos-id-city", videosIDcity);
app.use("/api/post", post);
app.use("/api/posts", posts);
//api - places
app.use("/api/places-continent", placesContinent);
app.use("/api/places-continent-id", placesContinentID);
app.use("/api/places-continents", placesContinents);
app.use("/api/places-continent-edit", placesContinentEdit);
app.use("/api/places-continent-create", placesContinentCreate);
app.use("/api/places-state", placesState);
app.use("/api/places-state-id", placesStateID);
app.use("/api/places-states", placesStates);
app.use("/api/places-states-continent", placesStatesContinent);
app.use("/api/places-state-edit", placesStateEdit);
app.use("/api/places-state-create", placesStateCreate);
app.use("/api/places-city", placesCity);
app.use("/api/places-city-id", placesCityID);
app.use("/api/places-cities", placesCities);
app.use("/api/places-cities-state", placesCitiesState);
app.use("/api/places-city-edit", placesCityEdit);
app.use("/api/places-city-create", placesCityCreate);
//api - post
app.use("/api/base-edit", baseEdit);
app.use("/api/platform-edit", platformEdit);
app.use("/api/video-edit", videoEdit);
app.use("/api/post-edit", postEdit);
app.use("/api/platform-create", platformCreate);
app.use("/api/video-create", videoCreate);
app.use("/api/post-create", postCreate);

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