import React from "react";
import { StopIcon } from "@heroicons/react/24/solid";

// components

// context or store

// constants or functions

type Props = {
  session: any;
  llmIsLoading: boolean;
  llmStop: () => void;
};

export default function UserStopButton({
  session,
  llmIsLoading,
  llmStop,
}: Props) {
  return (
    <div>
      <button
        disabled={!session || !llmIsLoading}
        onClick={llmStop}
        className="btn btn-error disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <StopIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
