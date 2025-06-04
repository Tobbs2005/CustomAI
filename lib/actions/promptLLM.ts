import { error } from "console";
import { stringify } from "querystring";

type promptProps = {
    userMessage: string
}

const promptLLM = async ({userMessage} : promptProps) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemma-3n-e4b-it:free',
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    });
  
    const data = await response.json();

    if(data.error){
        console.log(data.error.message);
    }

    return data.choices?.[0]?.message?.content || "No response";
  };
  
  export default promptLLM;
  