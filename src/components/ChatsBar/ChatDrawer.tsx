"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import {
  ArrowDownCircleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

// components
import CreateNewChatButton from "./CreateNewChatButton";
import ChatRow from "./ChatRow";
import { Loading } from "../Common";

// context or store

// constants or functions
import { db } from "@/config/firebase/firebase";

export function ChatDrawer() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-outline drawer-button">
          <ChatBubbleLeftIcon className="w-5 h-5 " />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* content */}
        <div className="menu p-4 w-80 min-h-full  text-base-content">
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
                chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
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
      </div>
    </div>
  );
}
