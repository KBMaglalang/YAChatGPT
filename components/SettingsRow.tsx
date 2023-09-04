import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase";

// components
import SettingsModal from "./SettingsModal";

function SettingsRow() {
  const { data: session } = useSession();
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
    <div>
      <div
        className="border-2 border-gray-700 chatRow"
        onClick={() => setModalOpen(true)}
      >
        <Cog8ToothIcon className="w-4 h-4" />
        <p>Settings</p>
      </div>

      {modalOpen && (
        <SettingsModal
          setModalOpen={setModalOpen}
          callback={handleUpdateSettings}
          signOut={signOut}
          data={""}
        />
      )}
    </div>
  );
}

export default SettingsRow;
