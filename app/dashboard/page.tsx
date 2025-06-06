
import ButtonAccount from "@/components/ButtonAccount";
import Pricing from "@/components/Pricing";
import checkUserAccess from "@/lib/actions/checkUserAccess";
import NewChatButton from "@/components/NewChatButton";
import ChatSidebar from "@/components/ChatSidebar/ChatSidebar";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        {checkUserAccess ? 
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <ChatSidebar />
          <NewChatButton />
        </div>
        :
        <div>
          <button>
            <Pricing />
          </button>
        </div>
        }
        
      </section>
    </main>
  );
}
