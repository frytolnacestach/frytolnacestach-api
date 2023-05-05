const express = require('express')
const cors = require('cors');
const app = express()
const path = require('path');
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
//base
const base = require("./api/base");
//base - post
const baseEdit = require("./api/base-edit");

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
const imageID = require("./api/image-id");

//video
const videos = require("./api/videos");
const videosIDcontinent = require("./api/videos-id-continent");
const videosIDstate = require("./api/videos-id-state");
const videosIDcity = require("./api/videos-id-city");
const video = require("./api/video");
const videoLast = require("./api/video-last");
//video - post
const videoCreate = require("./api/video-create");
const videoEdit = require("./api/video-edit");

//post
const posts = require("./api/posts");
const postsIDcontinent = require("./api/posts-id-continent");
const postsIDstate = require("./api/posts-id-state");
const postsIDcity = require("./api/posts-id-city");
const post = require("./api/post");
const postLast = require("./api/post-last");
//post - post
const postCreate = require("./api/post-create");
const postEdit = require("./api/post-edit");

//places - continent
const placesContinents = require("./api/places-continents");
const placesContinent = require("./api/places-continent");
const placesContinentID = require("./api/places-continent-id");
//places - continent - post
const placesContinentCreate = require("./api/places-continent-create");
const placesContinentEdit = require("./api/places-continent-edit");

//places - state
const placesStates = require("./api/places-states");
const placesStatesContinent = require("./api/places-states-continent");
const placesState = require("./api/places-state");
const placesStateID = require("./api/places-state-id");
//places - state - post
const placesStateCreate = require("./api/places-state-create");
const placesStateEdit = require("./api/places-state-edit");

//places - city
const placesCities = require("./api/places-cities");
const placesCitiesInitial = require("./api/places-cities-initial");
const placesCitiesIDstate = require("./api/places-cities-id-state");
const placesCity = require("./api/places-city");
const placesCityID = require("./api/places-city-id");
//places - city - post
const placesCityCreate = require("./api/places-city-create");
const placesCityEdit = require("./api/places-city-edit");
//CONSTS - END


//API
//api - base
app.use("/api/base", base);
//api - base - post
app.use("/api/base-edit", baseEdit);

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
app.use("/api/image-id", imageID);

//api - video
app.use("/api/videos", videos);
app.use("/api/videos-id-continent", videosIDcontinent);
app.use("/api/videos-id-state", videosIDstate);
app.use("/api/videos-id-city", videosIDcity);
app.use("/api/video", video);
app.use("/api/video-last", videoLast);
//api - video - post
app.use("/api/video-create", videoCreate);
app.use("/api/video-edit", videoEdit);

//api - post
app.use("/api/posts", posts);
app.use("/api/posts-id-continent", postsIDcontinent);
app.use("/api/posts-id-state", postsIDstate);
app.use("/api/posts-id-city", postsIDcity);
app.use("/api/post", post);
app.use("/api/post-last", postLast);
//api - post - post
app.use("/api/post-create", postCreate);
app.use("/api/post-edit", postEdit);

//api - places - continent
app.use("/api/places-continent", placesContinent);
app.use("/api/places-continent-id", placesContinentID);
app.use("/api/places-continents", placesContinents);
//api - places - continent - post
app.use("/api/places-continent-create", placesContinentCreate);
app.use("/api/places-continent-edit", placesContinentEdit);

//api - places - state
app.use("/api/places-states", placesStates);
app.use("/api/places-states-continent", placesStatesContinent);
app.use("/api/places-state", placesState);
app.use("/api/places-state-id", placesStateID);
//api - places - state - post
app.use("/api/places-state-create", placesStateCreate);
app.use("/api/places-state-edit", placesStateEdit);

//api - places - city
app.use("/api/places-cities", placesCities);
app.use("/api/places-cities-initial", placesCitiesInitial);
app.use("/api/places-cities-id-state", placesCitiesIDstate);
app.use("/api/places-city", placesCity);
app.use("/api/places-city-id", placesCityID);
//api - places - city - post
app.use("/api/places-city-create", placesCityCreate);
app.use("/api/places-city-edit", placesCityEdit);
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