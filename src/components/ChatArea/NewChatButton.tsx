import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

// components
import NewChatModal from "./NewChatModal";

// context or store

// constants or functions

function NewChatButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <div
        className="p-4 font-bold text-white bg-indigo-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
        onClick={() => setModalOpen(true)}
      >
        <PlusIcon className="w-4 h-4" />
      </div>

      {modalOpen && <NewChatModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewChatButton;
