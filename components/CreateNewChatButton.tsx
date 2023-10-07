import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // ! Don't use the next/router use next/navigation instead
import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase";

function CreateNewChatButton() {
  const router = useRouter();
  const { data: session } = useSession();

  /**
   * Creates a new chat in the "users" collection of Firebase for the current user, with a unique ID generated for the chat.
   * The chat is then redirected to the chat page.
   *
   * @returns {Promise<void>} - A promise that resolves when the new chat is successfully created and the user is redirected.
   */
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(), // ! don't use local timestamp use server timestamp since you don't know where they are in the world
        title: "",
      }
    );

    router.replace(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="chatRow font-brand-roboto">
      <PlusIcon className="w-4 h-4" />
      <span>New Chat</span>
    </div>
  );
}

export default CreateNewChatButton;
