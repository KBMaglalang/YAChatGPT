"use client";
/*
  ! using hooks, we need to add 'use client' on this component since it is server component by default
*/

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";

// components
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import SettingsRow from "./SettingsRow";
import Loading from "./Loading";

function SideBar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col p-2 h-screen ${isOpen ? "min-w-[20rem]" : ""}`}
    >
      {/* loading */}
      {loading && isOpen && (
        <div className="flex justify-center mt-4 h-screen">
          <Loading />
        </div>
      )}

      {/* cta */}
      {chats?.empty && isOpen && (
        <div className="flex flex-col justify-end items-center h-full">
          <p className="hidden text-xl font-bold text-white truncate md:inline-flex">
            Create New Chats
          </p>
          <ArrowDownCircleIcon className="mx-auto mt-5 w-10 h-10 text-white animate-bounce" />
        </div>
      )}

      {/* chat options */}
      {isOpen && (
        <div className="overflow-y-scroll flex-1">
          <div className="flex flex-col my-2 space-y-2">
            {/* map through the chatRows */}
            {!chats?.empty &&
              chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
          </div>
        </div>
      )}

      {/* model selection */}
      {isOpen && (
        <div className="hidden mb-2 sm:inline">
          <ModelSelection />
        </div>
      )}

      {/* Settings */}
      {isOpen && (
        <div className="mb-2">
          <SettingsRow />
        </div>
      )}

      <div className={`flex flex-row mt-auto space-x-2 w-full`}>
        {/* new chat */}
        {isOpen && (
          <div className="flex-1">
            <NewChat />
          </div>
        )}

        <div className={`chatRow`} onClick={toggleDrawer}>
          <BookOpenIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
