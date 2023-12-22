import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

// components

// context or store

// constants or functions
import { db } from '@/config/firebase/firebase';
import { getDisplayText } from '@/lib/displayTextLimit';

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false);

  // get document fields from firebase
  const [chatDoc, chatLoading, chatError] = useDocument(
    doc(db, 'users', session?.user?.email!, 'chats', id)
  );

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered whenever the `pathname` or `id` changes. */
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  /**
   * The handleOnClick function stops event propagation and replaces the current route with a new route
   * to the chat page.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<HTMLSpanElement,
   * MouseEvent>`. It represents the mouse click event that triggered the function.
   */
  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    router.replace(`/chat/${id}`);
  };

  return (
    <div>
      {/* main button */}
      <div
        onClick={handleOnClick}
        // className={`chatRow justify-center ${active && "bg-indigo-600"}`}
        className={`btn btn-neutral w-full font-brand-roboto ${active && 'btn-active'}`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />

        <span className="flex-1 truncate font-brand-roboto md:inline-flex">
          {getDisplayText(chatDoc?.data()?.title) || 'New Chat'}
        </span>
      </div>
    </div>
  );
}

export default ChatRow;
