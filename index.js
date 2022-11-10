const express = require('express')

const app = express()

const product = require("./api/product");
const posts = require("./api/posts");

app.use(express.json({ extended: false }));

app.use("/api/product", product);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))