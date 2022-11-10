const express = require('express')

const app = express()

const product = require("./api/product");

app.use(express.json({ extended: false }));

app.use("/api/product", product);

const PORT = process.env.PORT || 5050

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))