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

app.use('/', router);
const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))