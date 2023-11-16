import React from "react";
import Link from "next/link";

// components
import { ChatDrawer } from "../ChatsBar";
import { PromptDrawer } from "../PromptsBar";

// context or store

// constants or functions
import { WEBSITE_TITLE } from "@/constants";

export function Header() {
  return (
    <header className="">
      <div className="navbar bg-base-100">
        {/* chat bar */}
        <div className="navbar-start">
          <ChatDrawer />
        </div>

        {/* website name */}
        <div className="navbar-center">
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <Link href={"/"}>
            <h1 className="text-xl font-bold">{WEBSITE_TITLE}</h1>
          </Link>
        </div>

        {/* prompt bar */}
        <div className="navbar-end">
          <PromptDrawer />
        </div>
      </div>
    </header>
  );
}
