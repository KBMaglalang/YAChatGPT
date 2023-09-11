import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { db } from "@/firebase";

// components
import ChatEditModal from "./ChatEditModal";
import ChatDeleteModal from "./ChatDeleteModal";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  // get subcollection of messages
  const [messages, loading, error] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  // get document fields from firebase
  const [chatDoc, chatLoading, chatError] = useDocument(
    doc(db, "users", session?.user?.email!, "chats", id)
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  // udpate a chjat
  /**
   * Updates a prompt.
   *
   * @param {string} title - The updated title of the prompt.
   * @param {string} prompt - The updated content of the prompt.
   * @returns {void}
   */
  const updatePrompt = async (title: string) => {
    await updateDoc(doc(db, "users", session?.user?.email!, "chats", id), {
      title: title || "New Prompt",
    });
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

    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));

    if (active) {
      router.replace("/"); // * using replace instead of push to prevent the user from going back to the deleted chat
    }
  };

  const modalEditCallback = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalOpen(true);
  };

  const modalDeleteCallback = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalDeleteOpen(true);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    router.replace(`/chat/${id}`);
  };

  return (
    <div>
      {/* main button */}
      <div
        onClick={handleOnClick}
        className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
      >
        <ChatBubbleLeftIcon className="w-5 h-5" />
        <p className="flex-1 hidden truncate md:inline-flex">
          {chatDoc?.data()?.title || "New Chat"}
        </p>
        <PencilSquareIcon
          onClick={modalEditCallback}
          className="w-5 h-5 text-gray-700 hover:text-blue-500"
        />

        <TrashIcon
          onClick={modalDeleteCallback}
          className="w-5 h-5 text-gray-700 hover:text-red-700"
        />
      </div>

      {/* chat edit modal */}
      {modalOpen && (
        <ChatEditModal
          setModalOpen={setModalOpen}
          callback={updatePrompt}
          title={chatDoc?.data()?.title}
        />
      )}

      {/* chat delete modal */}
      {modalDeleteOpen && (
        <ChatDeleteModal
          setModalOpen={setModalDeleteOpen}
          callback={removeChat}
        />
      )}
    </div>
  );
}

export default ChatRow;
