import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  TrashIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useDocument } from "react-firebase-hooks/firestore";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

// components
import PromptEditModal from "./PromptEditModal";
import PromptDeleteModal from "./PromptDeleteModal";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants or functions
import { db } from "@/config/firebase/firebase";

type Props = {
  id: string;
};

function PromptRow({ id }: Props) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
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
   * Edits a prompt modal.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event object.
   * @returns {void}
   */
  const modalEditPrompt = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalOpen(true);
  };

  /**
   * Delete a prompt modal.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event object.
   * @returns {void}
   */
  const modelDeletePrompt = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalDeleteOpen(true);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    promptInput(prompts?.data()?.prompt);
  };

  return (
    <div>
      {/* button */}
      <div
        // className={`justify-center chatRow`}
        className={`btn btn-neutral w-full font-brand-roboto`}
      >
        <DocumentTextIcon className="w-5 h-5 " />

        <span
          className="flex-1 truncate md:inline-flex font-brand-roboto"
          onClick={handleOnClick}
        >
          {prompts?.data()?.title || "New Prompt"}
        </span>

        <PencilSquareIcon
          onClick={modalEditPrompt}
          className="w-5 h-5  hover:text-blue-500"
        />

        <TrashIcon
          onClick={modelDeletePrompt}
          // className="w-5 h-5  hover:text-red-700"
          className="w-5 h-5  hover:text-red-700"
        />
      </div>

      {/* prompt edit modal */}
      {modalOpen && (
        <PromptEditModal
          setModalOpen={setModalOpen}
          callback={updatePrompt}
          title={prompts?.data()?.title}
          prompt={prompts?.data()?.prompt}
        />
      )}

      {/* prompt delete modal */}
      {modalDeleteOpen && (
        <PromptDeleteModal
          setModalOpen={setModalDeleteOpen}
          callback={removePrompt}
        />
      )}
    </div>
  );
}

export default PromptRow;
