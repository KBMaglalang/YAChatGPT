import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import NewChatModal from "./NewChatModal";

function NewChatButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdateSettings = async () => {
    // const doc = await addDoc(
    //   collection(db, "users", session?.user?.email!, "settings"),
    //   {
    //     userId: session?.user?.email!,
    //     createdAt: serverTimestamp(), // ! don't use local timestamp use server timestamp since you don't know where they are in the world
    //     title: title || "New Prompt",
    //     prompt: prompt || "",
    //   }
    // );
  };

  return (
    <div>
      <div className="chatRow" onClick={() => setModalOpen(true)}>
        <PlusIcon className="w-4 h-4" />
        <p className="hidden lg:block">Chat</p>
      </div>

      {modalOpen && (
        <NewChatModal
          setModalOpen={setModalOpen}
          callback={handleUpdateSettings}
        />
      )}
    </div>
  );
}

export default NewChatButton;
