import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDocument } from "react-firebase-hooks/firestore";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// components
import ChatEditModal from "./ChatEditModal";
import ChatDeleteModal from "./ChatDeleteModal";

// context or store

// constants or functions
import { db } from "@/config/firebase/firebase";
import { getDisplayText } from "@/lib/displayTextLimit";

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

  // get document fields from firebase
  const [chatDoc, chatLoading, chatError] = useDocument(
    doc(db, "users", session?.user?.email!, "chats", id)
  );

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered whenever the `pathname` or `id` changes. */
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  // udpate a chat
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

  /**
   * The function "modalEditCallback" sets the state of "modalOpen" to true when called.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<SVGSVGElement,
   * MouseEvent>`. It represents the mouse click event that triggered the callback function.
   */
  const modalEditCallback = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalOpen(true);
  };

  /**
   * The function `modalDeleteCallback` is a callback function that sets the state variable
   * `modalDeleteOpen` to `true` when called, and it also stops the propagation of the click event.
   * @param e - The parameter `e` is an event object of type `React.MouseEvent<SVGSVGElement,
   * MouseEvent>`. It represents the mouse event that triggered the callback function.
   */
  const modalDeleteCallback = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setModalDeleteOpen(true);
  };

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
        className={`btn btn-neutral w-full font-brand-roboto ${
          active && "btn-active"
        }`}
      >
        <ChatBubbleLeftIcon className="w-5 h-5" />

        <span className="flex-1 md:inline-flex font-brand-roboto">
          {getDisplayText(chatDoc?.data()?.title) || "New Chat"}
        </span>

        <PencilSquareIcon
          onClick={modalEditCallback}
          className="w-5 h-5  hover:text-blue-500"
        />

        <TrashIcon
          onClick={modalDeleteCallback}
          className="w-5 h-5  hover:text-red-700"
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
