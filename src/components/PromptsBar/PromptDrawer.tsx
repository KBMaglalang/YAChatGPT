'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// components
import CreateNewPromptButton from './CreateNewPromptButton';
import PromptRow from './PromptRow';
import { Loading } from '../Common';

// context or store

// constants or functions
import { db } from '@/config/firebase/firebase';

export function PromptDrawer() {
  const { data: session } = useSession();
  const [prompts, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'prompt'), orderBy('createdAt', 'asc'))
  );

  return (
    <div className="drawer drawer-end justify-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="btn btn-outline drawer-button ">
          <DocumentTextIcon className="h-5 w-5" />
        </label>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        {/* Sidebar content here */}
        <div className="menu h-full w-80 bg-base-200 p-4 text-base-content">
          {(prompts?.empty || loading || !session) && (
            <div className="flex flex-1 flex-col items-center justify-center font-brand-roboto text-xl  font-bold">
              {/* prompts loading from firebase */}
              {loading && <Loading />}

              {/* no session */}
              {!session && <span>Sign In</span>}

              {/* cta */}
              {!loading && prompts?.empty && (
                <>
                  <div className="hidden truncate font-brand-roboto  text-xl font-bold md:inline-flex">
                    Create New Prompt
                  </div>
                  <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10  animate-bounce" />
                </>
              )}
            </div>
          )}

          {/* prompt options */}
          {session && !loading && !prompts?.empty && (
            <div className="flex-1 overflow-y-scroll">
              <div className="my-2 flex flex-col space-y-2">
                {/* map through the chatRows */}
                {!prompts?.empty &&
                  prompts?.docs.map((prompt) => <PromptRow key={prompt.id} id={prompt.id} />)}
              </div>
            </div>
          )}

          {session && (
            <div className={`mt-auto flex w-full flex-row space-x-2`}>
              {/* new prompt button */}
              <div className="flex-1">
                <CreateNewPromptButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
