'use server'

import deductTokens from "./deductTokens"
import promptLLM from "./promptLLM";
import getTokenCount from "./getTokenCount";
import { createClient } from "@/lib/supabase/server";
import { calculateTokenCost } from "./calculateTokenCost";
import promptCoze from "./promptCoze";

type MessageProps = {
    userMessage: string
    chatId: string
}


const newMessage = async ({userMessage, chatId} : MessageProps) => {
    const cost = await calculateTokenCost(userMessage);

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

        await deductTokens(cost);
        return llmResponse;
    }
    catch (error) {
        console.log(error.message)
        throw new Error(error.message || "Unexpected error"); // rethrow
    }
    
    
}

export default newMessage;