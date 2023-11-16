"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import {
  ArrowDownCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// components
import CreateNewPromptButton from "./CreateNewPromptButton";
import PromptRow from "./PromptRow";
import { Loading } from "../Common";

// context or store

// constants or functions
import { db } from "@/config/firebase/firebase";

export function PromptDrawer() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [prompts, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "prompt"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="drawer drawer-end justify-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-outline ">
          <DocumentTextIcon className="w-5 h-5" />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* no session */}
          {!session && (
            <div className="flex flex-col justify-center items-center mt-4 h-full text-xl font-bold text-white font-brand-roboto">
              <span>Sign In</span>
            </div>
          )}

          {/* prompts loading from firebase */}
          {loading && isOpen && (
            <div className="flex justify-center items-center mt-4 h-full">
              <Loading />
            </div>
          )}

          {/* cta */}
          {prompts?.empty && isOpen && (
            <div className="flex flex-col justify-center items-center h-full">
              <div className="hidden text-xl font-bold text-white truncate md:inline-flex font-brand-roboto">
                Create New Prompt
              </div>
              <div className="flex justify-center items-center mt-5">
                <ArrowDownCircleIcon className="w-10 h-10 text-white animate-bounce" />
              </div>
            </div>
          )}

          {/* prompt options */}
          {isOpen && (
            <div className="overflow-y-scroll flex-1">
              <div className="flex flex-col my-2 space-y-2">
                {/* map through the chatRows */}
                {!prompts?.empty &&
                  prompts?.docs.map((prompt) => (
                    <PromptRow key={prompt.id} id={prompt.id} />
                  ))}
              </div>
            </div>
          )}

          {session && (
            <div className={`flex flex-row mt-auto space-x-2 w-full`}>
              {/* new prompt button */}
              {isOpen && (
                <div className="flex-1">
                  <CreateNewPromptButton />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
