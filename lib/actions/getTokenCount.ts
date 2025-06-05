import { createClient } from "@/lib/supabase/server";

const getTokenCount = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("getUser failed:", userError);
    throw new Error("No user session found");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("token_count")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    throw new Error("Failed to fetch profile");
  }

  if (!profile) {
    console.error("No profile row found for user:", user.id);
    throw new Error("No profile data found");
  }

  return profile.token_count;
};

export default getTokenCount;
