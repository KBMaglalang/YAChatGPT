import React from "react";

// components

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
};

function PromptDeleteModal({ setModalOpen, callback }: Props) {
  /**
   * The handleAccept function is a callback that prevents the default behavior of a button click
   * event, calls a callback function, and sets a modal state to false.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<HTMLButtonElement,
   * MouseEvent>`. It represents the mouse event that triggered the function.
   */
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    callback(e);

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
          {/* prompt input */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold  font-brand-roboto">
                Delete Prompt?
              </h4>
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

export default PromptDeleteModal;
