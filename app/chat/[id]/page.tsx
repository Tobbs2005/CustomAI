import Chatbox from "@/components/Chatbox";

const Page = ({ params }: { params: { chatId: string } }) => {
  return <Chatbox chatId={params.chatId} />
};

export default Page;