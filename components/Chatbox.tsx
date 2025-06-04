'use client'

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import promptLLM from '@/lib/actions/promptLLM';

enum UserState {
  READY = 'READY',
  FETCHING = 'FETCHING'
}

const Chatbox = () => {
  const [userState, setUserState] = useState<UserState>(UserState.READY);
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleSubmit = async () => {
    const submittedText = userInput

    setUserInput("");
    try {
      setUserState(UserState.FETCHING)
      const res = await promptLLM({ userMessage: submittedText }); 
      setUserState(UserState.READY);
      setResponseText(res);
    } catch (error) {
      console.error("Error calling LLM:", error);
      setResponseText("Something went wrong.");
    }

  };

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
        ) : 
        <Button disabled className="mt-2 blur">
          Waiting
        </Button>
        }

        
      </div>
    </main>
  );
};

export default Chatbox;
