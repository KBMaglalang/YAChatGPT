"use client";

import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";
import Message from "./Message";
import Loading from "./Loading";

type Props = {
  chatId: string;
  llmMessages: any;
  llmIsLoading: boolean;
};

function Chat({ chatId, llmMessages, llmIsLoading }: Props) {
  console.log("🚀 ~ file: Chat.tsx:20 ~ Chat ~ llmIsLoading:", llmIsLoading);
  console.log("🚀 ~ file: Chat.tsx:19 ~ Chat ~ llmMessages:", llmMessages);

  const { data: session } = useSession();
  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  // Method to scroll to the bottom of a scrollable div container
  // Reference for the scrollable div
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  // Automatically scrolls to the bottom of a scrollable div container when new messages are received
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [llmMessages]);

  return (
    <div
      className="overflow-y-auto overflow-x-hidden flex-1 w-full"
      ref={scrollContainerRef}
    >
      {/* loading */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}

      {/* cta */}
      {messages?.empty && (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="mt-10 text-xl font-bold text-center text-white justify">
            Type a prompt below!
          </p>
          <div className="flex justify-center items-center mt-5">
            <ArrowDownCircleIcon className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
      )}

      {/* messages */}
      {/* {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))} */}
      {llmMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Chat;
