import React from "react";
import Link from "next/link";

// components
import { ChatDrawer } from "../ChatsBar";
import { PromptDrawer } from "../PromptsBar";
import SettingsRow from "../ChatArea/SettingsRow";
import { ThemeToggle } from "../Common";

// context or store

// constants or functions
import { WEBSITE_TITLE } from "@/constants";

export function Header() {
  return (
    <header className="">
      <div className="navbar ">
        {/* chat bar */}
        <div className="navbar-start">
          <div className="flex flex-row space-x-2">
            <ChatDrawer />
            <ThemeToggle />
          </div>
        </div>

        {/* website name */}
        <div className="navbar-center">
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <Link href={"/"}>
            <h1 className="text-xl font-bold">{WEBSITE_TITLE}</h1>
          </Link>
        </div>

        {/* prompt bar */}
        <div className="navbar-end ">
          <div className="flex flex-row space-x-2">
            <SettingsRow />
            <PromptDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
