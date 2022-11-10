const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();

const post = require("./api/post");
const posts = require("./api/posts");

app.use(express.json({ extended: false }));


//api
app.use("/api/post", post);
app.use("/api/posts", posts);

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
router.get('/public/img/base/hero.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/base/hero.png'));
});
router.get('/public/img/base/logotype.png',function(req,res){
    res.sendFile(path.join(__dirname+'/public/img/base/logotype.png'));
});

app.use('/', router);
const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))