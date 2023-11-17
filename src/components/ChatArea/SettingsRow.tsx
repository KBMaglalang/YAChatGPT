"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "@/firebase";

// components
import SettingsModal from "./SettingsModal";

// context or store

// constants or functions

function SettingsRow() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdateSettings = async () => {
    // const doc = await addDoc(
    //   collection(db, "users", session?.user?.email!, "settings"),
    //   {
    //     userId: session?.user?.email!,
    //     createdAt: serverTimestamp(), // ! don't use local timestamp use server timestamp since you don't know where they are in the world
    //     title: title || "New Prompt",
    //     prompt: prompt || "",
    //   }
    // );
  };

  return (
    <div className="">
      <button
        // className="p-4 font-bold  bg-indigo-600 rounded font-brand-roboto hover:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed textarea-expandable h-content"
        className="btn btn-outline "
        onClick={() => setModalOpen(true)}
      >
        <UserIcon className="w-4 h-4" />
      </button>

      {modalOpen && (
        <SettingsModal
          setModalOpen={setModalOpen}
          // callback={handleUpdateSettings}
          signOut={signOut}
          // data={""}
        />
      )}
    </div>
  );
}

export default SettingsRow;
