'use client';

import { useRouter } from 'next/navigation';
import { deleteChat } from "@/lib/actions/chatActions";
import { Button } from './ui/button';

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const router = useRouter();

  const handleClick = async () => {
    await deleteChat(chatId);
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <Button
      onClick={handleClick}
    >
      Delete Chat
    </Button>
  );
};

export default DeleteChatButton;