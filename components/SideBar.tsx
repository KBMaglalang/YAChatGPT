"use client";
/*
  ! using hooks, we need to add 'use client' on this component since it is server component by default
*/

import React from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";

// components
import CreateNewChatButton from "./CreateNewChatButton";
// import NewChatButton from "./NewChatButton";
import ChatRow from "./ChatRow";
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
    <div
      className={`flex flex-col p-4 h-full rounded bg-brand-additional-elements`}
    >
      {/* loading */}
      {loading && (
        <div className="flex justify-center mt-4">
          <Loading />
        </div>
      )}

      {/* cta */}
      {chats?.empty && (
        <div className="flex flex-col justify-end items-center mt-6 h-full">
          <ArrowUpCircleIcon className="mx-auto mt-5 w-10 h-10 text-white animate-bounce" />
          <p className="hidden text-xl font-bold text-white truncate md:inline-flex font-brand-roboto">
            Create New Chats
          </p>
        </div>
      )}

      {/* chat options */}
      <div className="overflow-y-scroll flex-1">
        <div className="flex flex-col my-2 space-y-2">
          {/* map through the chatRows */}
          {!chats?.empty &&
            chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
        </div>
      </div>

      <div className={`flex flex-row mt-auto space-x-2 w-full`}>
        {/* new chat */}
        <div className="flex-1">
          <CreateNewChatButton />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
