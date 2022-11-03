import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    const postSlug = 'svet-meduz'

    app.get('/post/:postSlug', (request, response) => {
        postSlug = request.params.productSlug; 
    })

    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('slug', postSlug)

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    } 
}