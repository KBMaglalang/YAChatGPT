import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "@/firebase";

// components
import SettingsModal from "./SettingsModal";

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
    <div>
      <div className="chatRow" onClick={() => setModalOpen(true)}>
        <UserIcon className="w-4 h-4" />
        <p className="hidden font-medium lg:block font-brand-roboto">User</p>
      </div>

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
