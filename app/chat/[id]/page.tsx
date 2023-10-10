"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat, Message } from "ai/react";
import { useSession } from "next-auth/react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { orderBy, query, addDoc, collection, doc } from "firebase/firestore";
import useSWR from "swr";
// import { toast } from "react-hot-toast";

import { useStateContext } from "@/lib/context/stateContext";
import { CHATGPT_DEFAULT } from "@/lib/constants";

import { db } from "@/firebase";

// components
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import BaseLayout from "@/components/BaseLayout";

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
  const { promptSettings } = useStateContext();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    messages,
    input,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setMessages,
    setInput,
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
    if (!session) {
      router.replace("/");
    }
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(JSON.parse(error.message).message);
  //   }
  // }, [error]);

  // get document fields from firebase
  const [chatDoc, chatLoading, chatError] = useDocument(
    session && doc(db, "users", session?.user?.email!, "chats", id)
  );

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
    <BaseLayout layoutTitle={chatDoc?.data()?.title || "New Chat"}>
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
        llmSetInput={setInput}
      />
    </BaseLayout>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
