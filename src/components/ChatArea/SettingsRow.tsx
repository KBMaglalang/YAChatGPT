"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";

// components
import SettingsModal from "./SettingsModal";

// context or store

// constants or functions

function SettingsRow() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="">
      <button className="btn btn-outline " onClick={() => setModalOpen(true)}>
        <UserIcon className="w-4 h-4" />
      </button>

      {modalOpen && (
        <SettingsModal setModalOpen={setModalOpen} signOut={signOut} />
      )}
    </div>
  );
}

export default SettingsRow;
