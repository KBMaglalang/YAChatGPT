import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

// components
import SideBar from "./SideBar";
import PromptBar from "./PromptBar";

type Props = {
  children: React.ReactNode;
  layoutTitle: string;
};

export default function BaseLayout({ children, layoutTitle }: Props) {
  return (
    <div className="container flex flex-col my-8 w-full">
      <div className="flex justify-between space-x-4 text-brand-white">
        <div className="flex overflow-hidden flex-1 p-4 rounded-xl bg-brand-additional-elements">
          {/* {chatDoc?.data()?.title || "New Chat"} */}
          {layoutTitle}
        </div>
        <div className="flex flex-row p-4 rounded-xl bg-brand-additional-elements">
          <MagnifyingGlassCircleIcon className="w-6 h-6" />
          <input
            type="text"
            className="hidden px-4 ml-2 rounded bg-brand-additional-elements focus:outline-none lg:block"
            placeholder="Search - Coming Soon"
          />
        </div>
      </div>

      <div className="container flex overflow-hidden flex-row gap-2 mt-8 h-full rounded-xl bg-brand-chat-area">
        <div className="hidden w-2/12 lg:block">
          <SideBar />
        </div>

        <div className="flex flex-col flex-grow justify-center items-center w-8/12">
          {children}
        </div>

        <div className="hidden w-2/12 lg:block">
          <PromptBar />
        </div>
      </div>
    </div>
  );
}
