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
};

function Chat({ chatId }: Props) {
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
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-x-hidden overflow-y-auto"
      ref={scrollContainerRef}
    >
      {/* loading */}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}

      {/* cta */}
      {messages?.empty && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mt-10 text-xl font-bold text-center text-white justify">
            Type a prompt below to get started!
          </p>
          <div className="flex items-center justify-center mt-5">
            <ArrowDownCircleIcon className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
      )}

      {/* messages */}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}

export default Chat;
