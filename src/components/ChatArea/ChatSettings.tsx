import React, { useState } from 'react';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';

// component
import ChatSettingsModal from './ChatSettingsModal';

// context or store

// constants or functions

export default function ChatSettings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div
        className="btn btn-primary disabled:cursor-not-allowed disabled:bg-gray-300"
        onClick={() => setModalOpen(true)}
      >
        <Cog8ToothIcon className="h-4 w-4" />
      </div>

      {modalOpen && <ChatSettingsModal setModalOpen={setModalOpen} />}
    </div>
  );
}
