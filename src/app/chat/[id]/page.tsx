"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat, Message } from "ai/react";
import { useSession } from "next-auth/react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { orderBy, query, addDoc, collection, doc } from "firebase/firestore";
import useSWR from "swr";

// components
import { Chat, ChatInput } from "@/components/ChatArea";
import { BaseLayout } from "@/components/Layout";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants or functions
import { CHATGPT_DEFAULT } from "@/constants";
import { db } from "@/config/firebase/firebase";

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
  }, [router, session]);

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
    if (
      !firebaseLoading &&
      messages.length == 0 &&
      firebaseMessages?.docs?.length! > 0
    ) {
      const newMessage = firebaseMessages?.docs
        ?.filter((doc) => doc.id !== "")
        ?.map((doc) => ({
          content: doc?.data().content,
          role: doc?.data().role,
          createdAt: doc?.data().createdAt,
          id: doc?.data().id,
        }));

      setMessages(newMessage as Message[]);
    }
  }, [firebaseLoading, messages, setMessages]);

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
