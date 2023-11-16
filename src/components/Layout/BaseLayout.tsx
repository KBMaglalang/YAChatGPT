import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// components
// import { SideBar } from "../ChatsBar";
// import { PromptBar } from "../PromptsBar";

// context or store

// constants or functions
import { WEBSITE_TITLE } from "@/constants";

type Props = {
  children: React.ReactNode;
  layoutTitle?: string;
};

export function BaseLayout({ children, layoutTitle }: Props) {
  return (
    <div className="container flex flex-col w-full my-8">
      <div className="flex justify-between space-x-4 text-brand-white">
        {/* <div className="flex items-center flex-1 p-4 overflow-hidden text-center rounded-xl bg-brand-additional-elements"> */}
        {/* web title */}
        {/* <Link href={"/"}>
            <h1 className="text-xl font-bold">{WEBSITE_TITLE}</h1>
          </Link> */}

        {/* chat if applicable */}
        {/* <div className="pl-2 text-lg font-regular">
            {layoutTitle && (
              <div className="space-x-2">
                <span className="text-xl font-bold">{">"}</span>
                <span>{layoutTitle}</span>
              </div>
            )}
          </div>
        </div> */}
        {/* <div className="flex flex-row p-4 rounded-xl bg-brand-additional-elements">
          <MagnifyingGlassCircleIcon className="w-6 h-6" />
          <input
            type="text"
            className="hidden px-4 ml-2 rounded bg-brand-additional-elements focus:outline-none lg:block"
            placeholder="Search - Coming Soon"
          />
        </div> */}
      </div>

      <div className="container flex flex-row h-full gap-2 mt-8 overflow-hidden rounded-xl ">
        {/* <div className="hidden w-2/12 lg:block">
          <SideBar />
        </div> */}

        <div className="flex flex-col items-center justify-center flex-grow w-8/12">
          {children}
        </div>

        {/* <div className="hidden w-2/12 lg:block">
          <PromptBar />
        </div> */}
      </div>
    </div>
  );
}
