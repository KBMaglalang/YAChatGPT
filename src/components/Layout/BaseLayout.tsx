import React from 'react';

// components
import { Header } from '../Header';

// context or store

// constants or functions
import { WEBSITE_TITLE } from '@/constants';

type Props = {
  children: React.ReactNode;
  layoutTitle?: string;
};

export function BaseLayout({ children, layoutTitle }: Props) {
  return (
    <div className="container mx-auto flex h-full w-full flex-col">
      <Header />

      <div className="container flex h-full flex-row gap-2 overflow-hidden rounded-xl ">
        <div className="flex w-8/12 flex-grow flex-col items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
