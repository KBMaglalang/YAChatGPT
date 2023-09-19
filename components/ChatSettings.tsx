import React, { useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "@/lib/context/stateContext";

// component
import ChatSettingsModal from "./ChatSettingsModal";

export default function ChatSettings() {
  const [modalOpen, setModalOpen] = useState(false);
  const { setPromptSettings } = useStateContext();

  /**
   * Handles the change of a setting value.
   * Updates the prompt settings by merging the new value with the existing settings.
   *
   * @param {string} key - The key of the setting to be changed.
   * @param {number} newValue - The new value to be assigned to the setting.
   * @returns {void}
   */
  const handleSettingChange = (key: string, newValue: number) => {
    setPromptSettings((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div>
      <div className="chatRow" onClick={() => setModalOpen(true)}>
        <Cog8ToothIcon className="w-4 h-4" />
        <p className="hidden lg:block">Chat Settings</p>
      </div>

      {modalOpen && <ChatSettingsModal setModalOpen={setModalOpen} />}
    </div>
  );
}
