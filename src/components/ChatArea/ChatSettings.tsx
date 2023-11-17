import React, { useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

// component
import ChatSettingsModal from "./ChatSettingsModal";

// context or store

// constants or functions

export default function ChatSettings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div
        className="btn btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => setModalOpen(true)}
      >
        <Cog8ToothIcon className="w-4 h-4" />
      </div>

      {modalOpen && <ChatSettingsModal setModalOpen={setModalOpen} />}
    </div>
  );
}
