import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import NewChatModal from "./NewChatModal";

function NewChatButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="chatRow" onClick={() => setModalOpen(true)}>
        <PlusIcon className="w-4 h-4" />
        <p className="hidden lg:block font-brand-roboto">Chat</p>
      </div>

      {modalOpen && <NewChatModal setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewChatButton;
