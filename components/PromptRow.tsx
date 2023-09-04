import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  TrashIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useDocument } from "react-firebase-hooks/firestore";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase";
import { useStateContext } from "@/lib/context/stateContext";

// components
import PromptModal from "./PromptModal";

type Props = {
  id: string;
};

function PromptRow({ id }: Props) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [prompts, loading, error] = useDocument(
    doc(db, "users", session?.user?.email!, "prompt", id)
  );
  const { promptInput } = useStateContext();

  /**
   * Updates a prompt.
   *
   * @param {string} title - The updated title of the prompt.
   * @param {string} prompt - The updated content of the prompt.
   * @returns {void}
   */
  const updatePrompt = async (title: string, prompt: string) => {
    await updateDoc(doc(db, "users", session?.user?.email!, "prompt", id), {
      title: title || "New Prompt",
      prompt: prompt || "",
    });
  };

  /**
   * Removes a prompt.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event object.
   * @returns {void}
   */
  const removePrompt = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await deleteDoc(doc(db, "users", session?.user?.email!, "prompt", id));
  };

  /**
   * Edits a prompt.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event object.
   * @returns {void}
   */
  const editPrompt = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    setModalOpen(true);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    promptInput(prompts?.data()?.prompt);
  };

  return (
    <div>
      {/* button */}
      <div className={`chatRow justify-center `}>
        <DocumentTextIcon className="w-5 h-5 text-white" />

        <span
          className="flex-1 hidden truncate md:inline-flex"
          onClick={handleOnClick}
        >
          {prompts?.data()?.title || "New Prompt"}
        </span>

        <PencilSquareIcon
          onClick={editPrompt}
          className="w-5 h-5 text-gray-700 hover:text-blue-500"
        />

        <TrashIcon
          onClick={removePrompt}
          className="w-5 h-5 text-gray-700 hover:text-red-700"
        />
      </div>

      {/* prompt modal */}
      {modalOpen && (
        <PromptModal
          setModalOpen={setModalOpen}
          callback={updatePrompt}
          title={prompts?.data()?.title}
          prompt={prompts?.data()?.prompt}
        />
      )}
    </div>
  );
}

export default PromptRow;
