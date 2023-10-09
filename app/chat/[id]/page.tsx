"use client";

import React, { useEffect } from "react";
import { useChat, Message } from "ai/react";
import { useSession } from "next-auth/react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { orderBy, query, addDoc, collection, doc } from "firebase/firestore";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

import { useStateContext } from "@/lib/context/stateContext";
import { CHATGPT_DEFAULT } from "@/lib/constants";

import { db } from "@/firebase";

// components
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import SideBar from "@/components/SideBar";
import PromptBar from "@/components/PromptBar";
import { getDisplayText } from "@/lib/displayTextLimit";

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
    if (error) {
      toast.error(JSON.parse(error.message).message);
    }
  }, [error]);

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
    <div className="container flex flex-col my-8 w-full">
      <div className="flex justify-between space-x-4 text-brand-white">
        <div className="overflow-hidden p-4 w-9/12 rounded-xl bg-brand-additional-elements">
          {chatDoc?.data()?.title || "New Chat"}
        </div>
        <div className="flex flex-row p-4 w-3/12 rounded-xl bg-brand-additional-elements">
          <MagnifyingGlassCircleIcon className="mr-2 w-6 h-6" />
          <input
            type="text"
            className="flex-1 px-4 rounded bg-brand-additional-elements focus:outline-none"
            placeholder="Search - Coming Soon"
          />
        </div>
      </div>

      <div className="container flex overflow-hidden flex-row gap-2 mt-8 h-full rounded-xl bg-brand-chat-area">
        <div className="w-2/12">
          <SideBar />
        </div>

        <div className="flex flex-col flex-grow w-8/12">
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
        </div>

        <div className="w-2/12">
          <PromptBar />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
