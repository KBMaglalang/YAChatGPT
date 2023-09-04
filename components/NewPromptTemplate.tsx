import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase";

// components
import PromptModal from "./PromptModal";

function NewPromptTemplate() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Creates a new prompt template.
   *
   * @param {string} title - The title of the prompt template.
   * @param {string} prompt - The content of the prompt template.
   * @returns {void}
   */
  const createNewPromptTemplate = async (title: string, prompt: string) => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "prompt"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(), // ! don't use local timestamp use server timestamp
        title: title || "New Prompt",
        prompt: prompt || "",
      }
    );
  };

  return (
    <>
      {/* new prompt button */}
      <div
        // onClick={createNewTemplate}
        onClick={() => setModalOpen(true)}
        className="border-2 border-gray-700 chatRow"
      >
        <PlusIcon className="w-4 h-4" />
        <p>New Prompt</p>
      </div>

      {/* prompt modal */}
      {modalOpen && (
        <PromptModal
          setModalOpen={setModalOpen}
          callback={createNewPromptTemplate}
          title={""}
          prompt={""}
        />
      )}
    </>
  );
}

export default NewPromptTemplate;
