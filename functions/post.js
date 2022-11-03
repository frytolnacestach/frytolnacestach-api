import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdjxqerpuvcwnbiqojnv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {

    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('slug', 'svet-meduz')

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    } 
}