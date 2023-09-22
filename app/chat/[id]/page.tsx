"use client";

import React, { useEffect } from "react";
import { useChat, Message } from "ai/react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { orderBy, query, addDoc, collection } from "firebase/firestore";
import useSWR from "swr";
import { toast } from "react-hot-toast";

import { useStateContext } from "@/lib/context/stateContext";
import { CHATGPT_DEFAULT } from "@/lib/constants";

// components
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { db } from "@/firebase";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  // * there was a change on the api endpoints v1 -> v2
  // useSWR to get models from openai
  const { data: model } = useSWR("model", {
    fallbackData: CHATGPT_DEFAULT,
  });
  const { data: session } = useSession();
  const { promptSettings } = useStateContext();
  const {
    messages,
    input,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setMessages,
  } = useChat({
    onFinish: async (message) => {
      await addDoc(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        message
      );
    },

    body: {
      settings: {
        maxTokens: promptSettings.maxTokens,
        temperature: promptSettings.temperature,
        topP: promptSettings.topP,
        frequencyPenalty: promptSettings.frequencyPenalty,
        presencePenalty: promptSettings.presencePenalty,
        modelName: model,
      },
    },

    sendExtraMessageFields: true,
  });

  useEffect(() => {
    if (error) {
      toast.error(JSON.parse(error.message).message);
    }
  }, [error]);

  const [firebaseMessages, firebaseLoading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (messages.length == 0 && firebaseMessages?.docs?.length! > 0) {
      const newMessage = firebaseMessages?.docs?.map((doc) => ({
        content: doc?.data().content,
        role: doc?.data().role,
        createdAt: doc?.data().createdAt,
        id: doc?.data().id,
      }));

      setMessages(newMessage as Message[]);
    }
  }, [firebaseLoading]);

  return (
    <div className="flex overflow-hidden flex-col items-center w-screen lg:w-2/3">
      {/* chat window */}
      <Chat llmMessages={messages} />

      {/* chat input */}
      <ChatInput
        chatId={id}
        llmStop={stop}
        llmInput={input}
        llmSubmit={handleSubmit}
        llmHandleInputChange={handleInputChange}
        llmIsLoading={isLoading}
      />
    </div>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
