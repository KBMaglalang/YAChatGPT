import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

// components

// context or store

// constants or functions

type Props = {
  session: any;
  llmInput: string;
};

export default function UserSendButton({ session, llmInput }: Props) {
  return (
    <div>
      <button
        type="submit"
        disabled={!session || !llmInput}
        className="px-4 py-4 font-bold text-white bg-indigo-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
      >
        <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
      </button>
    </div>
  );
}
