import React from "react";
import { StopIcon } from "@heroicons/react/24/solid";

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
        className="px-4 py-4 font-bold text-white bg-red-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
      >
        <StopIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
