"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";

// components
import NewPromptTemplate from "./NewPromptTemplate";
import PromptRow from "./PromptRow";
import Loading from "./Loading";

function PromptBar() {
  const { data: session } = useSession();
  const [prompts, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "prompt"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col h-screen p-2 ">
      {/* prompts loading from firebase */}
      {loading && (
        <div className="flex justify-center h-screen mt-4">
          <Loading />
        </div>
      )}

      {/* cta */}
      {prompts?.empty && (
        <div className="flex flex-col items-center justify-end h-full ">
          <div className="hidden text-xl font-bold text-white truncate md:inline-flex">
            Create New Prompt
          </div>
          <div className="flex items-center justify-center mt-5">
            <ArrowDownCircleIcon className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
      )}

      {/* prompt options */}
      <div className="flex-1 overflow-y-scroll">
        <div className="flex flex-col my-2 space-y-2">
          {/* map through the chatRows */}
          {!prompts?.empty &&
            prompts?.docs.map((prompt) => (
              <PromptRow key={prompt.id} id={prompt.id} />
            ))}
        </div>
      </div>

      {/* new prompt button */}
      <div className="mt-2">
        <NewPromptTemplate />
      </div>
    </div>
  );
}

export default PromptBar;
