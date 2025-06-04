
import { createClient } from '@supabase/supabase-js'

const checkUserAccess = async () => {
        
    const supabaseUrl = 'https://kaacxhillyqufbfeqojb.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    const {
        data: { user },
      } = await supabase.auth.getUser();

    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('has_access')
    .eq("id", user.id)
    .single()

    if(error) {
        throw new Error(error?.message || "Failed to access data")
    }

    return profiles?.has_access === true;

}

export default checkUserAccess;