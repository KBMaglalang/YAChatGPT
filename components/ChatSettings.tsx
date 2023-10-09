import React, { useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

// component
import ChatSettingsModal from "./ChatSettingsModal";

export default function ChatSettings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div
        className="px-4 py-4 font-bold text-white bg-indigo-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
        onClick={() => setModalOpen(true)}
      >
        <Cog8ToothIcon className="w-4 h-4" />
      </div>

      {modalOpen && <ChatSettingsModal setModalOpen={setModalOpen} />}
    </div>
  );
}
