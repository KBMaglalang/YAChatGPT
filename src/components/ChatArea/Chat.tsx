'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

// components
import Message from './Message';

// context or store

// constants or functions

type Props = {
  llmMessages: any;
};

export function Chat({ llmMessages }: Props) {
  // Method to scroll to the bottom of a scrollable div container
  // Reference for the scrollable div
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is used to scroll to the bottom of a scrollable div container whenever the
  `llmMessages` prop changes. */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [llmMessages]);

  return (
    <div className="w-full flex-1 overflow-y-auto overflow-x-hidden" ref={scrollContainerRef}>
      {/* cta */}
      {llmMessages?.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="justify mt-10 text-center font-brand-roboto  text-xl font-bold">
            Type a prompt below!
          </p>
          <div className="mt-5 flex items-center justify-center">
            <ArrowDownCircleIcon className="h-10 w-10  animate-bounce" />
          </div>
        </div>
      )}

      {/* messages */}
      <div className="space-y-2">
        {llmMessages?.map((message: Message) => <Message key={message.id} message={message} />)}
      </div>
    </div>
  );
}
