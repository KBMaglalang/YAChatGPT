"use client";
/*
  ! using hooks, we need to add 'use client' on this component since it is server component by default
*/

import React from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";

// components
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import SettingsRow from "./SettingsRow";
import Loading from "./Loading";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col h-screen p-2 ">
      {/* loading */}
      {loading && (
        <div className="flex justify-center h-screen mt-4">
          <Loading />
        </div>
      )}

      {/* cta */}
      {chats?.empty && (
        <div className="flex flex-col items-center justify-end h-full">
          <p className="hidden text-xl font-bold text-white truncate md:inline-flex">
            Create New Chats
          </p>
          <ArrowDownCircleIcon className="w-10 h-10 mx-auto mt-5 text-white animate-bounce" />
        </div>
      )}

      {/* chat options */}
      <div className="flex-1 overflow-y-scroll">
        <div className="flex flex-col my-2 space-y-2">
          {/* map through the chatRows */}
          {!chats?.empty &&
            chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
        </div>
      </div>

      {/* model selection */}
      <div className="hidden sm:inline">
        <ModelSelection />
      </div>

      {/* Settings */}
      <div className="mt-2">
        <SettingsRow />
      </div>

      {/* new chat */}
      <div className="mt-2">
        <NewChat />
      </div>
    </div>
  );
}

export default SideBar;
