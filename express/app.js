'use strict';

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({msg: 'Hello World :D'})
})

app.get('/clanky', (req, res) => {
    const clanky = require('../json/clanky.json')
    res.json(clanky)
})