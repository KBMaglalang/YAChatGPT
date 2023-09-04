import React from "react";

// components
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* chat window */}
      <Chat chatId={id} />

      {/* chat input */}
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
