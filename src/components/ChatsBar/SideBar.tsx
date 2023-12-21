'use client';
/*
  ! using hooks, we need to add 'use client' on this component since it is server component by default
*/

import React from 'react';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

// components
import CreateNewChatButton from './CreateNewChatButton';
import ChatRow from './ChatRow';
import { Loading } from '../Common';

// context or store

// constants or functions
import { db } from '@/config/firebase/firebase';

export function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  );

  return (
    <div className={`flex h-full flex-col rounded p-4 `}>
      {/* no session */}
      {!session && (
        <div className="mt-4 flex h-full flex-col items-center justify-center font-brand-roboto text-xl  font-bold">
          <span>Sign In</span>
        </div>
      )}

      {/* loading */}
      {loading && (
        <div className="mt-4 flex h-full items-center justify-center">
          <Loading />
        </div>
      )}

      {/* cta */}
      {chats?.empty && (
        <div className="mt-6 flex h-full flex-col items-center justify-center">
          <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10  animate-bounce" />
          <p className="hidden truncate font-brand-roboto  text-xl font-bold md:inline-flex">
            Create New Chats
          </p>
        </div>
      )}

      {/* chat options */}
      <div className="flex-1 overflow-y-scroll">
        <div className="my-2 flex flex-col space-y-2">
          {/* map through the chatRows */}
          {!chats?.empty && chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
        </div>
      </div>

      {session && (
        <div className={`mt-auto flex w-full flex-row space-x-2`}>
          {/* new chat */}
          <div className="flex-1">
            <CreateNewChatButton />
          </div>
        </div>
      )}
    </div>
  );
}
