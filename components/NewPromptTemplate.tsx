import React, { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

// components
import PromptList from "./PromptList";

function NewPromptTemplate() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* new prompt button */}
      <div onClick={() => setModalOpen(true)} className="chatRow">
        <BookOpenIcon className="w-4 h-4" />
        <span className="hidden lg:block">New Prompt</span>
      </div>

      {/* prompt modal */}
      {modalOpen && <PromptList setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewPromptTemplate;
