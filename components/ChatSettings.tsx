import React, { useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

// component
import ChatSettingsModal from "./ChatSettingsModal";

export default function ChatSettings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="chatRow" onClick={() => setModalOpen(true)}>
        <Cog8ToothIcon className="w-4 h-4" />
        <p className="hidden lg:block font-brand-roboto">Chat Settings</p>
      </div>

      {modalOpen && <ChatSettingsModal setModalOpen={setModalOpen} />}
    </div>
  );
}
