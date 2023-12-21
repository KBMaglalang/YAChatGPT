'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'; // ! setups a real time connection to the firebase database
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

// components
import CreateNewPromptButton from './CreateNewPromptButton';
import PromptRow from './PromptRow';
import { Loading } from '../Common';

// context or store

// constants or functions
import { db } from '@/config/firebase/firebase';

export function PromptBar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [prompts, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'prompt'), orderBy('createdAt', 'asc'))
  );

  return (
    <div className={`flex h-full flex-col rounded p-4 `}>
      {/* no session */}
      {!session && (
        <div className="mt-4 flex h-full flex-col items-center justify-center font-brand-roboto text-xl  font-bold">
          <span>Sign In</span>
        </div>
      )}

      {/* prompts loading from firebase */}
      {loading && isOpen && (
        <div className="mt-4 flex h-full items-center justify-center">
          <Loading />
        </div>
      )}

      {/* cta */}
      {prompts?.empty && isOpen && (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="hidden truncate font-brand-roboto  text-xl font-bold md:inline-flex">
            Create New Prompt
          </div>
          <div className="mt-5 flex items-center justify-center">
            <ArrowDownCircleIcon className="h-10 w-10  animate-bounce" />
          </div>
        </div>
      )}

      {/* prompt options */}
      {isOpen && (
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
          {isOpen && (
            <div className="flex-1">
              <CreateNewPromptButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
