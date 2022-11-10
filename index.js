const express = require('express')

const app = express()

const post = require("./api/post");
const posts = require("./api/posts");

app.use(express.json({ extended: false }));


//api
app.use("/api/post", post);
app.use("/api/posts", posts);

//pages
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/pages/index.html'));
});
app.get('/docs',function(req,res) {
    res.sendFile(path.join(__dirname+'/pages/docs.html'));
});


const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))