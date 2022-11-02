const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: 'fnAE0WVDYOACSxIJL219MKm7uGDyyNt_itjoew5i',
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
})

exports.handler = async (event, context) => {  
 
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

    //post
    const clanek = client.query(
        q.Get(q.Ref(q.Collection('posts'), '347140487201686092'))
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
    ))

    //posts
    const clanky = client.query(
        q.Index('all_posts')
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
        body: "C1:" + JSON.stringify(clanek) + "C2:" + clanek + "C3:" + {clanek} + "C4:" + JSON.stringify(clanky) + "C5:" + clanky + "C6:" + {clanky}
    }
}

    /*

    client.query(
        q.CreateCollection({name: "atest"})
    )

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