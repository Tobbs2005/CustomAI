'use client';


import React from 'react';
import { createClient } from "@/lib/supabase/client";

const newChat = async () => {
  const supabase = createClient();


  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Must be logged in to create new chat");
  }

  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: user.id }])
    .select()
    .single();
    if (error) {
      console.error("Error creating chat:", error.message);
      throw new Error(error.message)
    }
  
    return data;
}

export default newChat