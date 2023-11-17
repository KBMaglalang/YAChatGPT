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
        className="btn btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
      </button>
    </div>
  );
}
