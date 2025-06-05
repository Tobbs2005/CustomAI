
import ButtonAccount from "@/components/ButtonAccount";
import Pricing from "@/components/Pricing";
import checkUserAccess from "@/lib/actions/checkUserAccess";
import NewChatButton from "@/components/NewChatButton";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        {checkUserAccess ? 
        <div>
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
