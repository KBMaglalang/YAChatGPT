"use client";
/*
  ! using hooks, we need to add 'use client' on this component since it is server component by default
*/

import React from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

// components
import CreateNewChatButton from "./CreateNewChatButton";
import ChatRow from "./ChatRow";
import { Loading } from "../Common";

// context or store

// constants or functions
import { db } from "@/config/firebase/firebase";

export function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className={`flex flex-col p-4 h-full rounded `}>
      {/* no session */}
      {!session && (
        <div className="flex flex-col justify-center items-center mt-4 h-full text-xl font-bold text-white font-brand-roboto">
          <span>Sign In</span>
        </div>
      )}

      {/* loading */}
      {loading && (
        <div className="flex justify-center items-center mt-4 h-full">
          <Loading />
        </div>
      )}

      {/* cta */}
      {chats?.empty && (
        <div className="flex flex-col justify-center items-center mt-6 h-full">
          <ArrowDownCircleIcon className="mx-auto mt-5 w-10 h-10 text-white animate-bounce" />
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

      {session && (
        <div className={`flex flex-row mt-auto space-x-2 w-full`}>
          {/* new chat */}
          <div className="flex-1">
            <CreateNewChatButton />
          </div>
        </div>
      )}
    </div>
  );
}
