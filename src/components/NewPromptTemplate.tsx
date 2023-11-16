import React, { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

// components
import PromptList from "./PromptList";

function NewPromptTemplate() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      {/* new prompt button */}
      <div
        onClick={() => setModalOpen(true)}
        className="p-4 font-bold text-white bg-indigo-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
      >
        <BookOpenIcon className="w-4 h-4" />
      </div>

      {/* prompt modal */}
      {modalOpen && <PromptList setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewPromptTemplate;
