import React from "react";

// components
import { Header } from "../Header";

// context or store

// constants or functions
import { WEBSITE_TITLE } from "@/constants";

type Props = {
  children: React.ReactNode;
  layoutTitle?: string;
};

export function BaseLayout({ children, layoutTitle }: Props) {
  return (
    <div className="container flex flex-col w-full mx-auto h-full">
      <Header />

      <div className="container flex flex-row h-full gap-2 overflow-hidden rounded-xl ">
        <div className="flex flex-col items-center justify-center flex-grow w-8/12">
          {children}
        </div>
      </div>
    </div>
  );
}
