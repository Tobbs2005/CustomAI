
import { createClient } from "@/libs/supabase/server";

const checkUserAccess = async () => {
        
    const supabase = createClient();

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