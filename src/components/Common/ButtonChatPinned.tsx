'use client';

import React, { useState, useCallback } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc } from 'firebase/firestore';

// components

// context

// constants and functions
import { db } from '@/config/firebase/firebase';

type Props = {
  pinnedState: boolean;
  id: string;
  session: any;
};

export const ButtonChatPinned = ({ pinnedState, id, session }: Props) => {
  console.log('🚀 ~ file: ButtonChatPinned.tsx:21 ~ ButtonChatPinned ~ session:', session);
  console.log('🚀 ~ file: ButtonChatPinned.tsx:21 ~ ButtonChatPinned ~ id:', id);
  console.log('🚀 ~ file: ButtonChatPinned.tsx:21 ~ ButtonChatPinned ~ pinnedState:', pinnedState);
  const [state, setState] = useState(pinnedState || false);
  console.log('🚀 ~ file: ButtonChatPinned.tsx:22 ~ ButtonChatPinned ~ state:', state);

  // update state on toggle
  const handleToggleTheme = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(
        '🚀 ~ file: ButtonChatPinned.tsx:33 ~ awaitupdateDoc ~ e.target.checked:',
        !e.target.checked
      );
      await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', id), {
        pinned: !e.target.checked,
      });
      setState((prev) => !prev);
    },
    [id, session]
  );

  return (
    <label className="btn btn-outline swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" checked={state} onChange={handleToggleTheme} />

      {/* sun icon */}
      <StarIcon className="swap-on h-4 w-4 " />

      {/* moon icon */}
      <StarIcon className="swap-off h-4 w-4 fill-current" />
    </label>
  );
};
