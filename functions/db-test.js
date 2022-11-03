import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pplyaowxrctmsqubsnqv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbHlhb3d4cmN0bXNxdWJzbnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0NjczNjEsImV4cCI6MTk4MzA0MzM2MX0.P-E-U_4XeVzQ0pb3zupuM5TjvnIO9yCXoOg-BtFdtpw'
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {  

    const { data, error } = await supabase
    .from('test')
    .select()

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
    
}

/*const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
})*/

    /*const {
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

    console.log("______________________ START_4");*/

    //post slug
    /*const clanekid = client.query(
        q.Get(
          q.Match(q.Index('posts_by_slug'), 'svet-meduz')
        )
      )
      .then((ret) => console.log(ret))*/

    //clanky
    /*const jsonGet = client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("all_posts"))),q.Lambda("X", q.Get(q.Var("X")))
        )
    )
    .then((ret) => {
        return ret.data
    })
    
    const printJson = () => {
        jsonGet.then((a) => {
          let json = a
          console.log(JSON.stringify(json))
          return JSON.stringify(json)
        });
      };

    return {
        statusCode: 200,
        body: JSON.stringify(printJson())
    }*/

/*const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
})*/

    /*
    const printAddress = async () => {

            const a = await address;
        console.log(JSON.stringify(a))
        return JSON.stringify(a)

    };*/