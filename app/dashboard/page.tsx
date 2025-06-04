'use client'


export const dynamic = "force-dynamic";

import Chatbox from "@/components/Chatbox";
import Header from "@/components/Header";




// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Dashboard() {


  return (
    
    
    <main className="min-h-screen p-8 pb-24">
      <div className="space-y-4 w-full max-w-lg mx-auto">
        <Chatbox />



        
      </div>
    </main>
  );
}

