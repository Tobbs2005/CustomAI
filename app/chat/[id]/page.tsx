import Chatbox from "@/components/Chatbox";
import ChatSidebar from "@/components/ChatSidebar/ChatSidebar";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <ChatSidebar />
      <div className="w-full max-w-3xl mx-auto p-4">
        <Chatbox chatId={params.id} />
      </div>
    </main>
  )
};

export default Page;