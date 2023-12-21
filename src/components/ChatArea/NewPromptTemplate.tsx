import React, { useState } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

// components
import PromptList from './PromptList';

// context or store

// constants or functions

function NewPromptTemplate() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      {/* new prompt button */}
      <div
        onClick={() => setModalOpen(true)}
        className="textarea-expandable h-content  rounded bg-indigo-600 p-4 font-brand-roboto font-bold hover:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <BookOpenIcon className="h-4 w-4" />
      </div>

      {/* prompt modal */}
      {modalOpen && <PromptList setModalOpen={setModalOpen} />}
    </div>
  );
}

export default NewPromptTemplate;
