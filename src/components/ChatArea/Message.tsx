import React from 'react';
import { DocumentData } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// components

// context or store

// constants or functions

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`rounded-xl bg-base-300 py-5`}>
      <div className="mx-auto flex flex-col items-center space-x-5 px-10 md:flex-row md:items-start">
        {/* user and chatgpt icons */}
        {isAssistant ? (
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'}
            alt="avatar"
            className="h-8 w-8"
          />
        ) : (
          <UserCircleIcon className="h-8 w-8 " />
        )}

        {/* message container */}
        <div className="flex w-full flex-col">
          {/* message markdown */}
          <div className="flex flex-col flex-wrap items-center">
            <ReactMarkdown
              className="flex-shrink-1 prose w-full max-w-4xl break-words pt-2 font-brand-roboto"
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
