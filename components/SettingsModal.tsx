import { SignOutParams } from "next-auth/react";
import React, { useState } from "react";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: any;
  signOut: any;
  data: any;
};

function SettingsModal({ setModalOpen, callback, signOut }: Props) {
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // callback();  // TODO: finish this callback

    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto ">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center min-h-screen px-4 py-8 ">
        <div className="relative w-full max-w-lg p-4 mx-auto rounded-md shadow-2xl bg-[#121212] shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold text-white ">Settings</h4>

              {/* api input key */}
              <div className="flex flex-row items-center justify-between w-full mt-2">
                <span className="mr-4 text-xl font-bold text-white">
                  API Key
                </span>
                <input
                  type="text"
                  className="flex-1 p-2 my-2 text-gray-300 rounded-lg resize-none bg-gray-700/50 focus:outline-none"
                  placeholder="!!! Under Development"
                />
              </div>

              {/* logout */}
              <div className="flex flex-row items-center justify-between w-full mt-2">
                <span className="text-xl font-bold text-white">Logout</span>
                <button
                  className="mt-2 p-2.5  text-white bg-red-600 rounded-md outline-none ring-offset-2 focus:ring-2 hover:bg-red-900"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* user selection */}
          <div className="items-center gap-2 mt-3 sm:flex">
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

export default SettingsModal;
