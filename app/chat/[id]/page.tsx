"use client";

import React from "react";
import { useChat } from "ai/react";

// components
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const {
    messages,
    input,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
  } = useChat();

  return (
    <div className="flex overflow-hidden flex-col items-center w-screen lg:w-2/3">
      {/* chat window */}
      <Chat chatId={id} llmMessages={messages} llmIsLoading={isLoading} />

      {/* chat input */}
      <ChatInput
        chatId={id}
        llmStop={stop}
        llmInput={input}
        llmSubmit={handleSubmit}
        llmHandleInputChange={handleInputChange}
      />
    </div>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
