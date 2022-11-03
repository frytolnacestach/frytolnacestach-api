import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pplyaowxrctmsqubsnqv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
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