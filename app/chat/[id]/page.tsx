
import Chatbox from "@/components/Chatbox";
import ChatSidebar from "@/components/ChatSidebar/ChatSidebar";
import DeleteChatButton from "@/components/DeleteChatButton";
import NewChatButton from "@/components/NewChatButton";
import { redirect } from "next/navigation";


const Page = ({ params }: { params: { id: string } }) => {
  
  

  return (
    <main className="flex min-h-screen">
     <ChatSidebar />
      <div className="w-full max-w-3xl mx-auto p-4">
        <Chatbox chatId={params.id} />
        <DeleteChatButton chatId={params.id} />
        <NewChatButton />

        
          

      </div>

    </main>
  )
};

export default Page;