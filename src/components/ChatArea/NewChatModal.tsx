import React from "react";

// components
import { SideBar } from "../ChatsBar";

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewChatModal({ setModalOpen }: Props) {
  return (
    <div className="overflow-y-auto fixed inset-0 z-10">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative p-4 mx-auto w-full max-w-lg rounded-md shadow-2xl  shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold  font-brand-roboto">
                Conversations
              </h4>

              {/* list of chats  */}
              <SideBar />
            </div>
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 sm:flex">
            <button
              className="font-brand-roboto w-full mt-2 p-2.5 flex-1  rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
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
