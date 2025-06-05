'use server'

import deductTokens from "./deductTokens"
import promptLLM from "./promptLLM";
import getTokenCount from "./getTokenCount";
import { createClient } from "@/lib/supabase/server";

type MessageProps = {
    cost: number
    userMessage: string
    chatId: string
}


const newMessage = async ({cost, userMessage, chatId} : MessageProps) => {

    try {
        const supabase = createClient();

        if(await getTokenCount() < cost){
            throw new Error("insufficient tokens");
        }
        const llmResponse = await promptLLM({userMessage});

        // Add message onto database
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();

        if (!user || userError) {
            throw new Error("No user session found");
        }

        const { data, error } = await supabase
        .from('messages') 
        .insert({
            chat_id: chatId,
            content: userMessage,
            response: llmResponse,
            cost: cost,
        })
        .select();
        if (error) {
            console.error("Error creating chat:", error.message);
            throw new Error(error.message)
        }

        deductTokens(cost);
        return llmResponse;
    }
    catch (error) {
        console.log("an error as occurred")
    }
    
    
}

export default newMessage;