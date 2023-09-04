import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

import { db } from "@/firebase";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [messages, loading, error] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  /**
   * Removes a chat from the "users" collection in Firebase and redirects the user to the home page.
   *
   * @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The click event on the remove chat button.
   *
   * @returns {Promise<void>} - A promise that resolves when the chat is successfully removed and the user is redirected.
   */
  const removeChat = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));

    if (active) {
      router.replace("/"); // * using replace instead of push to prevent the user from going back to the deleted chat
    }
  };

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    router.replace(`/chat/${id}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <p className="flex-1 hidden truncate md:inline-flex">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="w-5 h-5 text-gray-700 hover:text-red-700"
      />
    </div>
  );
}

export default ChatRow;
