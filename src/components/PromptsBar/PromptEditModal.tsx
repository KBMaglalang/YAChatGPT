import React, { useState } from 'react';

// components

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
  title: string | undefined;
  prompt: string | undefined;
};

function PromptEditModal({ setModalOpen, callback, title = '', prompt = '' }: Props) {
  const [promptTitle, setPromptTitle] = useState(title);
  const [promptTextArea, setPromptTextArea] = useState(prompt || '{{text}}');

  /**
   * The handleAccept function is a callback that is triggered when a button is clicked, and it
   * prevents the default behavior, calls a callback function with two parameters, and sets a modal
   * state to false.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<HTMLButtonElement,
   * MouseEvent>`. It represents the mouse event that triggered the function.
   */
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    callback(promptTitle, promptTextArea);

    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 h-full w-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-base-200 p-4 shadow-2xl shadow-gray-700">
          {/* prompt input */}
          <div className="mt-3">
            <div className="mt-2 flex flex-col text-center">
              <h4 className="mb-2 font-brand-roboto text-xl  font-bold">Prompt Settings</h4>
              <input
                autoFocus
                type="text"
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                className="my-2 rounded-lg  p-2  font-brand-roboto focus:outline-none"
                placeholder="Prompt Title"
              />
              <textarea
                value={promptTextArea}
                onChange={(e) => setPromptTextArea(e.target.value)}
                rows={8}
                className="my-2 resize-none  rounded-lg p-2  font-brand-roboto focus:outline-none"
                placeholder="Type your prompt here"
              />
            </div>
          </div>

          {/* user selection */}
          <div className="mt-3 flex w-full flex-col items-center gap-2">
            <button className="btn btn-primary w-full font-brand-roboto" onClick={handleAccept}>
              Accept
            </button>
            <button
              className="btn btn-outline  w-full font-brand-roboto"
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
