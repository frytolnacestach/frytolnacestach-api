import { createClient } from '@supabase/supabase-js'
const bcrypt = require('bcrypt')

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.get("/", async (req, res) => {
    var email = req.query.email
    var passwordHash = req.query.password_hash

    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .eq('password', passwordHash)

        if (error) {
            return res.status(500).send("Server error")
        }

        if (data.length === 0) {
            return res.status(404).send("User not found")
        }

        res.send(JSON.stringify(data))
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
