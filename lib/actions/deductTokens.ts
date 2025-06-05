import { createClient } from "@/libs/supabase/server";
import getTokenCount from "./getTokenCount";

const deductTokens = async (numDeduct: number) => {
    const supabase = createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("No user session found");
    }

    let currCount = await getTokenCount()
    currCount -= numDeduct;

    await supabase
          .from("profiles")
          .update({
            token_count: currCount,

          })
          .eq("id", user?.id);

}

export default deductTokens;