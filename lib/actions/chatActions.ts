'use client';

import { createClient } from "@/lib/supabase/client";

export const newChat = async () => {
  const supabase = createClient();


  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("Must be logged in to create new chat");
    return;
  }

  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: user.id }])
    .select()
    .single();
  if (error) {
    console.error("Error creating chat:", error.message);
  }
  
    return data || null;
}

export const getChat = async (chatId : string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if(error){
    console.error("Error fetching chat:", error.message);
  }

  return data || "no data";
}


