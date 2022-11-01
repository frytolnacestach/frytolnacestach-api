const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
})

exports.handler = async (event, context) => {    
    const clanky = client.query(
        q.Get(q.Collection('posts'), '347140487201686092')
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
        body: JSON.stringify(clanky) + "C2:" + clanky + "C3:" + {clanky}
    }   
}

    /*
    const {
        Ref,
        Paginate,
        Get,
        Match,
        Index,
        Create,
        Collection,
        Join,
        Call,
        Function: Fn,
    } = faunadb.query;

    const clanky = await client.query(
        Get(
            Ref(
                Collection('posts')
            )
        )
    )*/

/*const clanky = await faunaClient.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_posts"), true)),
          q.Lambda("userRef", q.Get(q.Var("userRef")))
        )
      )*/

    /*
      const clanky = client.query(q.Get(q.Ref(q.Collection('posts'), '347140487201686092')))
      return {
        statusCode: 200,
        body: JSON.stringify(clanky),
      };*/
      
/*
      const clanky = client.query(
        q.Get(q.Index('all_posts'))
      )
      .then((ret) => console.log(ret))
      .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
      ))
*/
      /*
    const clanky = client.query(
        q.Get(q.Index('all_posts'))
      )
      .then((ret) => ret)
      .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
      ))*/

    
    
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