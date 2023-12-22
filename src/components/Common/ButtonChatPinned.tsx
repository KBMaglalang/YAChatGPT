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
  const [state, setState] = useState(pinnedState || false);

  // update state on toggle
  const handleToggleTheme = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
