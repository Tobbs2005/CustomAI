'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';

interface Chat {
  id: string;
  title: string;
  updated_at: string;
}

interface Props {
  chatList: Chat[];
}

const ChatSidebarClient = ({ chatList }: Props) => {
  const pathname = usePathname();

  return (
    <main>
      <div className="w-64 h-screen bg-gray-100 border-r px-4 py-6 overflow-y-auto space-y-4">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>

        {Array.isArray(chatList) && chatList.length > 0 ? (
          chatList.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            return (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <button
                  className={`w-full text-left p-3 rounded-lg hover:bg-gray-200 ${
                    isActive ? 'bg-gray-300 font-bold' : ''
                  }`}
                >
                  <div className="truncate">{chat.title || 'Untitled Chat'}</div>
                </button>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500">No chats available.</p>
        )}
      </div>
    </main>
  );
};

export default ChatSidebarClient;
