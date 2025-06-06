'use client';

import { useRouter } from 'next/navigation';
import { deleteChat } from "@/lib/actions/chatActions";

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const router = useRouter();

  const handleClick = async () => {
    await deleteChat(chatId);
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Delete Chat
    </button>
  );
};

export default DeleteChatButton;