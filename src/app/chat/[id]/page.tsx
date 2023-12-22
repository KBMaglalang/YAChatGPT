'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat, Message } from 'ai/react';
import { useSession } from 'next-auth/react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { orderBy, query, addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import useSWR from 'swr';
import { ChatBubbleLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// components
import { Chat, ChatInput } from '@/components/ChatArea';
import { BaseLayout } from '@/components/Layout';

// context or store
import { useStateContext } from '@/context/stateContext';

// constants or functions
import { CHATGPT_DEFAULT } from '@/constants';
import { db } from '@/config/firebase/firebase';
import { ButtonChatPinned } from '@/components/Common';
import ChatEditModal from '@/components/ChatsBar/ChatEditModal';
import ChatDeleteModal from '@/components/ChatsBar/ChatDeleteModal';

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  // * there was a change on the api endpoints v1 -> v2
  // useSWR to get models from openai
  const { data: model } = useSWR('model', {
    fallbackData: CHATGPT_DEFAULT,
  });
  const { promptSettings } = useStateContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setMessages,
    setInput,
  } = useChat({
    onFinish: async (message) => {
      await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        message
      );
    },

    body: {
      settings: {
        maxTokens: promptSettings.maxTokens,
        temperature: promptSettings.temperature,
        topP: promptSettings.topP,
        frequencyPenalty: promptSettings.frequencyPenalty,
        presencePenalty: promptSettings.presencePenalty,
        modelName: model,
      },
    },

    sendExtraMessageFields: true,
  });

  /**

  Use effect hook that checks if session exists.
  If session does not exist, redirect to home page.
  @param {object} router - The router object used for navigation.
  @param {object} session - The session object to check for existence. */
  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [router, session]);

  /* The code `const [chatDoc, chatLoading, chatError] = useDocument(session && doc(db, "users",
  session?.user?.email!, "chats", id));` is using the `useDocument` hook from the
  `react-firebase-hooks/firestore` library to fetch a specific document from the Firestore database. */
  const [chatDoc, chatLoading, chatError] = useDocument(
    session && doc(db, 'users', session?.user?.email!, 'chats', id)
  );

  /* The code is using the `useCollection` hook from the `react-firebase-hooks/firestore` library to
  fetch a collection of documents from the Firestore database. */
  const [firebaseMessages, firebaseLoading] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
      )
  );

  /* This `useEffect` hook is responsible for updating the `messages` state when new messages are
  fetched from the Firestore database. */
  useEffect(() => {
    if (!firebaseLoading && messages.length == 0 && firebaseMessages?.docs?.length! > 0) {
      const newMessage = firebaseMessages?.docs
        ?.filter((doc) => doc.id !== '')
        ?.map((doc) => ({
          content: doc?.data().content,
          role: doc?.data().role,
          createdAt: doc?.data().createdAt,
          id: doc?.data().id,
        }));

      setMessages(newMessage as Message[]);
    }
  }, [firebaseLoading, messages, setMessages]);

  /**
   * The function "modalEditCallback" sets the state of "modalOpen" to true when called.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<SVGSVGElement,
   * MouseEvent>`. It represents the mouse click event that triggered the callback function.
   */
  const modalEditCallback = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    setModalOpen(true);
  };

  // udpate a chat
  /**
   * Updates a prompt.
   *
   * @param {string} title - The updated title of the prompt.
   * @param {string} prompt - The updated content of the prompt.
   * @returns {void}
   */
  const updatePrompt = async (title: string) => {
    await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', id), {
      title: title || 'New Prompt',
    });
  };

  /**
   * The function `modalDeleteCallback` is a callback function that sets the state variable
   * `modalDeleteOpen` to `true` when called, and it also stops the propagation of the click event.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<SVGSVGElement,
   * MouseEvent>`. It represents the mouse event that triggered the callback function.
   */
  const modalDeleteCallback = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    setModalDeleteOpen(true);
  };

  /**
   * Removes a chat from the "users" collection in Firebase and redirects the user to the home page.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event on the remove chat button.
   *
   * @returns {Promise<void>} - A promise that resolves when the chat is successfully removed and the user is redirected.
   */
  const removeChat = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));

    // if (active) {
    router.replace('/'); // * using replace instead of push to prevent the user from going back to the deleted chat
    // }
  };

  return (
    <BaseLayout layoutTitle={chatDoc?.data()?.title || 'New Chat'}>
      {/* chat title */}
      <div className="flex w-full flex-row items-center px-2">
        {/* chat title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{chatDoc?.data()?.title || 'New Chat'}</h1>
        </div>

        {/* chat options */}
        <div className="flex flex-row space-x-2">
          {/* pinned */}
          <ButtonChatPinned pinnedState={chatDoc?.data()?.pinned} id={id} session={session} />

          {/* edit */}
          <button className="btn btn-outline" onClick={modalEditCallback}>
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          {modalOpen && (
            <ChatEditModal
              setModalOpen={setModalOpen}
              callback={updatePrompt}
              title={chatDoc?.data()?.title}
            />
          )}

          {/* delete */}
          <button className="btn btn-outline" onClick={modalDeleteCallback}>
            <TrashIcon className="h-5 w-5  hover:text-red-700" />
          </button>
          {modalDeleteOpen && (
            <ChatDeleteModal setModalOpen={setModalDeleteOpen} callback={removeChat} />
          )}
        </div>
      </div>

      {/* chat window */}
      <Chat llmMessages={messages} />

      {/* chat input */}
      <ChatInput
        chatId={id}
        llmStop={stop}
        llmInput={input}
        llmSubmit={handleSubmit}
        llmHandleInputChange={handleInputChange}
        llmIsLoading={isLoading}
        llmSetInput={setInput}
      />
    </BaseLayout>
  );
}

export default ChatPage;

// ! note: because this is a server component, this will receive props data from the server
// ! note: everything on the top level gets some props from the server - no need to use pathname to get the id
