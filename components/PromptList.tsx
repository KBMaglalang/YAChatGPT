import React from "react";

import PromptBar from "./PromptBar";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromptList({ setModalOpen }: Props) {
  // const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   setModalOpen(false);
  // };

  return (
    <div className="overflow-y-auto fixed inset-0 z-10">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative w-full max-w-lg p-4 mx-auto rounded-md shadow-2xl bg-[#121212] shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <h4 className="mb-2 text-xl font-bold text-center text-white">
              Prompts
            </h4>

            <PromptBar />
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 sm:flex">
            <button
              className="w-full mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={(e) => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
