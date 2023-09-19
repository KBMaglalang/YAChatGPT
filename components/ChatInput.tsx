"use client";

import React, {
  useState,
  useRef,
  useEffect,
  FormEvent,
  KeyboardEvent,
} from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import useSWR from "swr";
// import Slider from "./Slider";
import { useStateContext } from "@/lib/context/stateContext";

// components
// import ModelSelection from "./ModelSelection";
import NewPromptTemplate from "./NewPromptTemplate";
import NewChatButton from "./NewChatButton";
import SettingsRow from "./SettingsRow";
import ChatSettings from "./ChatSettings";

import { CHATGPT_DEFAULT } from "@/lib/constants";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const { userInput, setUserInput, promptSettings } = useStateContext();

  // * there was a change on the api endpoints v1 -> v2
  // useSWR to get models from openai
  const { data: model } = useSWR("model", {
    fallbackData: CHATGPT_DEFAULT,
  });

  // Dynamically adjusts the height of a textarea element based on the user's input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"; // Reset height first to get a "clean slate"
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [userInput]);

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

    if (!userInput) return;

    const input = userInput.trim();
    setUserInput("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: "user",
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
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

    const notification = toast.loading("ChatGPT is thinking...");

    // Sends a question to the "/api/askQuestion" endpoint and displays a success message when ChatGPT responds
    const openAiAnswer = await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
        promptSettings,
      }),
    });

    // check if the response from the server failed - update the toast to error
    if (!openAiAnswer.ok) {
      toast.error("ChatGPT failed to respond!", {
        id: notification,
      });
      return;
    }

    toast.success("ChatGPT has responded!", {
      id: notification,
    });
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

  // /**
  //  * Handles the change of a setting value.
  //  * Updates the prompt settings by merging the new value with the existing settings.
  //  *
  //  * @param {string} key - The key of the setting to be changed.
  //  * @param {number} newValue - The new value to be assigned to the setting.
  //  * @returns {void}
  //  */
  // const handleSettingChange = (key: string, newValue: number) => {
  //   setPromptSettings((prev) => ({ ...prev, [key]: newValue }));
  // };

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
      <form onSubmit={sendMessage} className="flex p-5 space-x-5">
        <div className="flex w-full textarea-expandable">
          <textarea
            autoFocus
            ref={textareaRef}
            disabled={!session}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            placeholder="Type your message here... (CTRL + ENTER to send)"
          />
        </div>

        {/* send button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            disabled={!session || !userInput}
            className="px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
          >
            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
          </button>
        </div>
      </form>

      {/* model selection when in mobile view */}
      {/* <div className="md:hidden">
        <ModelSelection />
      </div> */}

      {/* settings */}
      {/* <div className="flex flex-wrap justify-around items-center p-4 w-full bg-transparent"> */}
      {/* temperature - slider and input */}
      {/* <Slider
          title="Temperature"
          min={0}
          max={2}
          value={promptSettings.temperature}
          callback={(value) => handleSettingChange("temperature", value)}
        /> */}

      {/* topP - slider and input */}
      {/* <Slider
          title="Top P"
          min={0}
          max={1}
          value={promptSettings.topP}
          callback={(value) => handleSettingChange("topP", value)}
        /> */}

      {/* frequencyPenalty - slider and input */}
      {/* <Slider
          title="Frequency Penalty"
          min={-2}
          max={2}
          value={promptSettings.frequencyPenalty}
          callback={(value) => handleSettingChange("frequencyPenalty", value)}
        /> */}

      {/* presencePenalty - slider and input */}
      {/* <Slider
          title="Presence Penalty"
          min={-2}
          max={2}
          value={promptSettings.presencePenalty}
          callback={(value) => handleSettingChange("presencePenalty", value)}
        /> */}

      {/* max tokens - input */}
      {/* <div className="flex flex-col items-center space-x-2">
          <span className="mb-2 messageSettings">Max Tokens</span>
          <input
            type="number"
            value={promptSettings.maxTokens}
            className="w-full mt-2 text-center rounded-md bg-[#212121] text-white"
            onChange={(e) =>
              handleSettingChange("maxTokens", parseFloat(e.target.value))
            }
          />
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default ChatInput;
