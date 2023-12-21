import React from 'react';

// components
import { PromptBar } from '../PromptsBar';

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromptList({ setModalOpen }: Props) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 h-full w-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md p-4 shadow-2xl  shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <h4 className="mb-2 text-center font-brand-roboto text-xl  font-bold">Prompts</h4>

            <PromptBar />
          </div>

          {/* user selection */}
          <div className="mt-3 items-center gap-2 sm:flex">
            <button
              className="mt-2 w-full flex-1 rounded-md border  p-2.5 font-brand-roboto outline-none ring-indigo-600 ring-offset-2 hover:bg-gray-700 focus:ring-2"
              onClick={(e) => setModalOpen(false)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
