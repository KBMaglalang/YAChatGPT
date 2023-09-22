"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

// components
import Message from "./Message";

type Props = {
  llmMessages: any;
};

function Chat({ llmMessages }: Props) {
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
      {/* cta */}
      {llmMessages?.length === 0 && (
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
      {llmMessages?.map((message: Message) => (
        <Message key={message.createdAt} message={message} />
      ))}
    </div>
  );
}

export default Chat;
