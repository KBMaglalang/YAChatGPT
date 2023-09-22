"use client";

import React, { useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { PaperAirplaneIcon, StopIcon } from "@heroicons/react/24/solid";

// components
import NewPromptTemplate from "./NewPromptTemplate";
import NewChatButton from "./NewChatButton";
import SettingsRow from "./SettingsRow";
import ChatSettings from "./ChatSettings";

type Props = {
  chatId: string;
  llmStop: () => void;
  llmInput: string;
  llmSubmit: (e: FormEvent<HTMLFormElement>) => void;
  llmHandleInputChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  llmIsLoading: boolean;
};

function ChatInput({
  chatId,
  llmStop,
  llmInput,
  llmSubmit,
  llmHandleInputChange,
  llmIsLoading,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();

  // Dynamically adjusts the height of a textarea element based on the user's input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"; // Reset height first to get a "clean slate"
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [llmInput]);

  /**
   * Sends a message, adds it to the "messages" collection within a specific chat in the "users" collection of Firebase,
   * and sends a question to the "/api/askQuestion" endpoint for ChatGPT to respond.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event.
   *
   * @returns {Promise<void>} - A promise that resolves when the message is sent and ChatGPT responds.
   */
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!llmInput) return;

    const message: Message = {
      content: llmInput,
      createdAt: serverTimestamp(),
      role: "user",
      id: "",
    };

    // Adds a new document to the "messages" collection within a specific chat in the "users" collection of firebase
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    llmSubmit(e);
  };

  /**
   * Handles the keydown event for the textarea element.
   * If the user presses the "Ctrl + Enter" keys, it triggers the sendMessage function.
   *
   * @param {KeyboardEvent<HTMLTextAreaElement>} e - The keydown event object.
   * @returns {void}
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      sendMessage(e as any);
    }
  };

  return (
    <div className="px-4 w-full text-sm text-white rounded-t-xl bg-gray-700/50">
      {/* modal bar */}
      <div className="flex flex-grow justify-around mt-4">
        <SettingsRow />
        <NewChatButton />
        <ChatSettings />
        <NewPromptTemplate />
      </div>

      {/* input */}
      {/* <form onSubmit={sendMessage} className="flex p-5 space-x-5"> */}
      <form onSubmit={sendMessage} className="flex p-5 space-x-5">
        <div className="flex w-full textarea-expandable">
          <textarea
            autoFocus
            ref={textareaRef}
            disabled={!session}
            value={llmInput}
            onChange={llmHandleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            placeholder="Type your message here... (CTRL + ENTER to send)"
          />
        </div>

        {/* send button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            disabled={!session || !llmInput}
            className="px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
          >
            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
          </button>
          <button
            disabled={!session || !llmIsLoading}
            onClick={llmStop}
            className="px-4 py-2 my-2 font-bold text-white bg-red-600 rounded hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
          >
            <StopIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
