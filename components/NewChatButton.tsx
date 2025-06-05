'use client'

import React from 'react'
import newChat from '@/lib/actions/chatActions'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const NewChatButton = () => {
  const router = useRouter();

  async function createNewChat() {
    try {
      const data = await newChat();
      if (data?.id) {
        router.push(`/chat/${data.id}`);
      }
    } catch (error) {
      console.error("Failed to create new chat:", error);
      // Optionally show an error message to the user
    }
  }

  return (
    <Button onClick={() => {  createNewChat() }}>New Chat</Button>
  )
}

export default NewChatButton