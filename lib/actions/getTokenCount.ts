import { createClient } from "@/libs/supabase/server";

const getTokenCount = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("No user session found");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("token_count")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return profile.token_count;
};

export default getTokenCount;