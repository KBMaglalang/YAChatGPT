import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

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
        className="btn btn-primary disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
      </button>
    </div>
  );
}
