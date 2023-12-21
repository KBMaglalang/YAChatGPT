import React from 'react';
import { StopIcon } from '@heroicons/react/24/solid';

// components

// context or store

// constants or functions

type Props = {
  session: any;
  llmIsLoading: boolean;
  llmStop: () => void;
};

export default function UserStopButton({ session, llmIsLoading, llmStop }: Props) {
  return (
    <div>
      <button
        disabled={!session || !llmIsLoading}
        onClick={llmStop}
        className="btn btn-error disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <StopIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
