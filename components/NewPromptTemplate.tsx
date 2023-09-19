import React, { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

// components
import PromptList from "./PromptList";

function NewPromptTemplate() {
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
      {/* new prompt button */}
      <div onClick={() => setModalOpen(true)} className="chatRow">
        <BookOpenIcon className="w-4 h-4" />
        <span className="hidden lg:block">New Prompt</span>
      </div>

      {/* prompt modal */}
      {modalOpen && (
        <PromptList
          setModalOpen={setModalOpen}
          callback={handleUpdateSettings}
        />
      )}
    </div>
  );
}

export default NewPromptTemplate;
