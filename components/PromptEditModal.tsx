import React, { useState } from "react";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
  title: string | undefined;
  prompt: string | undefined;
};

function PromptEditModal({
  setModalOpen,
  callback,
  title = "",
  prompt = "",
}: Props) {
  const [promptTitle, setPromptTitle] = useState(title);
  const [promptTextArea, setPromptTextArea] = useState(prompt || "{{text}}");

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    callback(promptTitle, promptTextArea);

    setModalOpen(false);
  };

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
          {/* prompt input */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold text-white">
                Prompt Settings
              </h4>
              <input
                autoFocus
                type="text"
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                className="p-2 my-2 text-white rounded-lg bg-gray-700/50 focus:outline-none"
                placeholder="Prompt Title"
              />
              <textarea
                value={promptTextArea}
                onChange={(e) => setPromptTextArea(e.target.value)}
                rows={8}
                className="p-2 my-2 text-white rounded-lg resize-none bg-gray-700/50 focus:outline-none"
                placeholder="Type your prompt here"
              />
            </div>
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 sm:flex">
            <button
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={handleAccept}
            >
              Accept
            </button>
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

export default PromptEditModal;
