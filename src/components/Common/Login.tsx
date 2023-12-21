'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

// components

// context or store

// constants or functions

export function Login() {
  return (
    <div
      className="btn btn-primary flex flex-col items-center justify-center text-center"
      onClick={() => signIn('google')}
    >
      <span className="m-4 text-3xl font-bold">Sign In</span>
    </div>
  );
}
