import ButtonAccount from "@/components/ButtonAccount";
import Chatbox from "@/components/Chatbox";
import Pricing from "@/components/Pricing";
import checkUserAccess from "@/lib/actions/checkUserAccess";
import getTokenCount from "@/lib/actions/getTokenCount";


export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        {checkUserAccess ? 
        <div>
          <Chatbox />
          <p>Remaining Credits: { getTokenCount() }</p>
          <p>Add more credits?</p>
          <Pricing />
        </div>
        :
        <div>
          <Pricing />
        </div>
        }
        
      </section>
    </main>
  );
}
