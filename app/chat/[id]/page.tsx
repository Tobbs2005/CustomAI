import Chatbox from "@/components/Chatbox";

const Page = ({ params }: { params: { id: string } }) => {
  return <Chatbox chatId={params.id} />
};

export default Page;