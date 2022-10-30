const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({msg: 'Hello World :D'})
})

app.get('/clanky', (req, res) => {
    const jokes = require('./json/clanky.json')
    res.json(jokes)
})

app.listen(8080, () => console.log('Server is Running ;)'))