'use client'

import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import newMessage from '@/lib/actions/newMessage';
import { getChat } from '@/lib/actions/chatActions';

enum UserState {
  READY = 'READY',
  FETCHING = 'FETCHING',
  OUT_OF_TOKENS = 'OUT_OF_TOKENS'
}

interface ChatboxProps {
  chatId: string;
}

const Chatbox = ({ chatId }: ChatboxProps) => {
  const [userState, setUserState] = useState<UserState>(UserState.READY);
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState<string | null>(null);
  const [tokenCount, setTokenCount] = useState<number | null>(null)

  const fetchTokenCount = async () => {
    const res = await fetch('/api/get-token-count');
    const data = await res.json();
    if (data.success) {
      setTokenCount(data.token_count);
    } else {
      setUserState(UserState.OUT_OF_TOKENS);
    }
  };

  useEffect(() => {
    fetchTokenCount();
  }, []);

  

  const handleSubmit = async () => {
    const submittedText = userInput

    if(tokenCount<1){
      setResponseText("Out of tokens");
      setUserState(UserState.OUT_OF_TOKENS);
      return;
    }

    setUserInput("");
    try {
      setUserState(UserState.FETCHING)
      const res = await newMessage({ userMessage: submittedText, cost: 1, chatId: chatId}); 
      setUserState(UserState.READY);
      setResponseText(res);
    } catch (error) {
      console.error("Error calling LLM:", error);
      setResponseText("Something went wrong.");
      setUserState(UserState.READY);
      return;
    }


    const deductRes = await fetch('/api/deduct-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1 }), // send the number of tokens to deduct
    });
    fetchTokenCount();
    const data = await deductRes.json();
  }


  const chatData = getChat(chatId);

  return (
    <main>
      <div className='border border-black border-solid rounded p-2'>
        <div className="text-sm text-muted-foreground">
          
          {responseText || "LLM response will appear here."}
        </div>
      </div>

      <div className="mt-4">
        <Textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="resize-none"
        />
        {
        userState === UserState.READY ? (
          <Button onClick={handleSubmit} className="mt-2">
            Submit
          </Button>
        ) 
        : 
        userState === UserState.OUT_OF_TOKENS ?
        <Button disabled className="mt-2"> 
          Out of tokens
        </Button>
        :
        <Button disabled className="mt-2">
          Waiting
        </Button>
        }

        
      </div>

      <p>Token count: {tokenCount ?? "Loading..."}</p>
    </main>
  );
};

export default Chatbox;
