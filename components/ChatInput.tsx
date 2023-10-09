"use client";

import React, { useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { PaperAirplaneIcon, StopIcon } from "@heroicons/react/24/solid";

import { useStateContext } from "@/lib/context/stateContext";

// components
import NewPromptTemplate from "./NewPromptTemplate";
import NewChatButton from "./NewChatButton";
import SettingsRow from "./SettingsRow";
import ChatSettings from "./ChatSettings";
import UserSendButton from "./UserSendButton";
import UserStopButton from "./UserStopButton";

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
  llmSetInput: React.Dispatch<React.SetStateAction<string>>;
};

function ChatInput({
  chatId,
  llmStop,
  llmInput,
  llmSubmit,
  llmHandleInputChange,
  llmIsLoading,
  llmSetInput,
}: Props) {
  const { userInput, setUserInput } = useStateContext();
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

  useEffect(() => {
    if (llmInput != userInput) {
      llmSetInput(userInput);
    }
  }, [userInput]);

  useEffect(() => {
    setUserInput(llmInput);
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
    <div className="px-4 mt-2 w-full text-sm text-white rounded-t-xl bg-gray-700/50">
      {/* input */}
      {/* <form onSubmit={sendMessage} className="flex p-5 space-x-5"> */}
      <form onSubmit={sendMessage} className="flex flex-row p-5 space-x-5">
        <div className="flex flex-1 w-full textarea-expandable">
          <textarea
            autoFocus
            ref={textareaRef}
            disabled={!session}
            value={llmInput}
            onChange={llmHandleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent resize-none font-brand-roboto focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            placeholder="Type your message here... (CTRL + ENTER to send)"
          />
        </div>

        {/* user control buttons */}
        <div className="flex flex-wrap gap-4 justify-end w-1/6">
          <UserSendButton session={session} llmInput={llmInput} />
          <UserStopButton
            session={session}
            llmIsLoading={llmIsLoading}
            llmStop={llmStop}
          />
          <ChatSettings />
          <SettingsRow />

          {/* hidden options for mobile view */}
          <NewChatButton />
          <NewPromptTemplate />
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
