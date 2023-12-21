'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

// components
import CreateNewChatButton from './CreateNewChatButton';
import ChatRow from './ChatRow';
import { Loading } from '../Common';

// context or store

// constants or functions
import { db } from '@/config/firebase/firebase';

export function ChatDrawer() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  );

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-outline drawer-button">
          <ChatBubbleLeftIcon className="h-5 w-5 " />
        </label>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

        {/* content */}
        <div className="menu h-full w-80 bg-base-200 p-4 text-base-content">
          {(chats?.empty || loading || !session) && (
            <div className="mt-4 flex flex-1 flex-col items-center justify-center font-brand-roboto text-xl  font-bold">
              {/* loading */}
              {loading && <Loading />}

              {/* no session */}
              {!session && <span>Sign In</span>}

              {/* cta */}
              {!loading && chats?.empty && (
                <>
                  <div className="truncate font-brand-roboto text-xl  font-bold">
                    Create New Chats
                  </div>
                  <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10  animate-bounce" />
                </>
              )}
            </div>
          )}

          {/* chat options */}
          {session && !loading && !chats?.empty && (
            <div className="flex-1 overflow-y-scroll">
              <div className="my-2 flex flex-col space-y-2">
                {/* map through the chatRows */}
                {!chats?.empty && chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)}
              </div>
            </div>
          )}

          {session && (
            <div className={`mt-auto flex w-full flex-row space-x-2`}>
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
