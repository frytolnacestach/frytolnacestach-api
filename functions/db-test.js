/*const {createPool} = require('mysql')

const pool = createPool({
    host: "a054um.forpsi.com",
    user: "f162838",
    password: "ErUJe3US",
    connectionLimit: 10
})

pool.query(`select * from apidb.users`, (err, res) => {
    return console.log(res)
})*/


exports.handler = async (event, context) => {
    var faunadb = require('faunadb')
    //var q = faunadb.query

    const client = new faunadb.Client({
        secret: '347139750152372818',
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    })


    const clanky = client.query(
        q.Get(q.Collection('clanky'))
      )
      .then((ret) => console.log(ret))
      .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
      ))

    return {
        statusCode: 200,
        body: JSON.stringify(clanky)
    }

    
    
    /*const clanky = require('../json/clanky.json')

    const { createPool } = require('mysql')

    const pool = createPool({
        host: "a054um.forpsi.com",
        user: "f162838",
        password: "ErUJe3US",
        database: "f162838",
        connectionLimit: 10
    })

    pool.query(`select * from posts where id = 1`, function(err, result, fields) {
        if (err) {
            console.log("test select - error");
            return console.log(err);
        }
        console.log("test select");
        return console.log(result);
    })

    module.exports = pool;

    return {
        statusCode: 200,
        body: JSON.stringify(clanky)
    }*/
    
   
}
/*
const { createPool } = require('mysql')

const pool = createPool({
    host: "a054um.forpsi.com",
    user: "f162838",
    password: "ErUJe3US",
    database: "f162838",
    connectionLimit: 10
})

pool.query(`select * from posts`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})*/