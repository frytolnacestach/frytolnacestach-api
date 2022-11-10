const express = require('express')

const app = express()

const index = require("./pages/index");
const docs = require("./pages/docs");
const post = require("./api/post");
const posts = require("./api/posts");

app.use(express.json({ extended: false }));

app.use("/pages/index", index);
app.use("/pages/docs", docs);
app.use("/api/post", post);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))