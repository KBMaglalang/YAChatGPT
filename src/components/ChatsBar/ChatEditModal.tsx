import React, { useState } from "react";

// components

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
  title: string | undefined;
};

function ChatEditModal({ setModalOpen, callback, title = "" }: Props) {
  const [chatTitle, setchatTitle] = useState(title);

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    callback(chatTitle);

    setModalOpen(false);
  };

  return (
    <div className="overflow-y-auto fixed inset-0 z-10">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative p-4 mx-auto w-full max-w-lg rounded-md shadow-2xl bg-base-200 shadow-gray-700">
          {/* chat input */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold  font-brand-roboto">
                Chat Settings
              </h4>
              <input
                autoFocus
                type="text"
                value={chatTitle}
                onChange={(e) => setchatTitle(e.target.value)}
                className="p-2 my-2  rounded-lg  focus:outline-none font-brand-roboto"
                placeholder="Chat Title"
              />
            </div>
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 flex flex-col  w-full">
            <button
              className="btn btn-primary font-brand-roboto w-full"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="btn btn-outline  font-brand-roboto w-full"
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

export default ChatEditModal;
