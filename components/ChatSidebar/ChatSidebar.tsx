import { getChatList } from "@/lib/actions/chatActions";
import ChatSidebarClient from "./ChatSidebarClient";
import { createClient } from "@/lib/supabase/server";

const ChatSidebar = async () => {
  const supabase = createClient();
  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const chatList = await getChatList({id: user.id});

  return (
    <ChatSidebarClient chatList={chatList} />
  );
};

export default ChatSidebar;