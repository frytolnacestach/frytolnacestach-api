import { createClient } from '@supabase/supabase-js'
const bcrypt = require('bcrypt')

const express = require("express")
const router = express.Router()

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

router.post("/", async (req, res) => {
    var email = req.body.email
    var codePassword = req.body.code_password
    var passwordNew = req.body.password_new

    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .eq('code_reset', codePassword)

        if (error) {
            return res.status(500).send("Server error")
        }

        if (data.length === 0) {
            return res.status(404).send("User not found")
        }

        //Změna hesla
        try {
            //hash hesla
            const hashedPassword = await bcrypt.hash(passwordNew, 10)

            const { data, error } = await supabase
                .from('users')
                .update({
                    password: hashedPassword,
                })
                .eq('email', email)

            if (error) {
                return res.status(500).send("Server error")
            }

            //vymazání code_reset
            try {    
                const { data, error } = await supabase
                    .from('users')
                    .update({
                        code_reset: '',
                    })
                    .eq('email', email)
    
                if (error) {
                    return res.status(500).send("Server error")
                }
    
                //znovu načtení uživatele
                try {
                    const { data, error } = await supabase
                        .from('users')
                        .select()
                        .eq('email', email)
            
                    if (error) {
                        return res.status(500).send("Server error")
                    }
            
                    if (data.length === 0) {
                        return res.status(404).send("User not found")
                    }
            
                    const user = data[0]
                    const passwordMatchNew = await bcrypt.compare(passwordNew, user.password)
            
                    if (!passwordMatchNew) {
                        return res.status(401).send("Invalid password")
                    }

                    res.json({
                        status: 200,
                        message: data
                    })
                } catch (error) {
                    return res.status(500).send("Server error")
                }
            } catch (error) {
                return res.status(500).send("Server error")
            }
        } catch (error) {
            return res.status(500).send("Server error")
        }
    
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

module.exports = router
