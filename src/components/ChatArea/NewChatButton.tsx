import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

// components
import NewChatModal from './NewChatModal';

// context or store

// constants or functions

function NewChatButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <div
        className="textarea-expandable h-content  rounded bg-indigo-600 p-4 font-brand-roboto font-bold hover:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
        onClick={() => setModalOpen(true)}
      >
        <PlusIcon className="h-4 w-4" />
      </div>

      {modalOpen && <NewChatModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewChatButton;
