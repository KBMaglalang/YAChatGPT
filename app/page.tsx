import React from "react";

import {
  HOMEPAGE_TITLE,
  HOMEPAGE_CONVERSATION_TITLE,
  HOMEPAGE_CONVERSATION_DESCRIPTION,
  HOMEPAGE_PROMPT_TITLE,
  HOMEPAGE_PROMPT_DESCRIPTION,
} from "@/lib/constants";

import SideBar from "@/components/SideBar";

function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center px-2 text-white lg:overflow-hidden">
      <h1 className="mb-20 w-full text-5xl font-bold text-center">
        {HOMEPAGE_TITLE}
      </h1>

      <div className="p-4 m-4 bg-[#121212] rounded-xl w-full md:w-1/2 shadow-gray-700 shadow-2xl">
        <h2 className="mb-4 text-3xl font-bold">
          {HOMEPAGE_CONVERSATION_TITLE}
        </h2>
        <p>{HOMEPAGE_CONVERSATION_DESCRIPTION}</p>
      </div>

      <div className="p-4 m-4 bg-[#121212] rounded-xl w-full md:w-1/2 shadow-gray-700 shadow-2xl">
        <h2 className="mb-4 text-3xl font-bold">{HOMEPAGE_PROMPT_TITLE}</h2>
        <p>{HOMEPAGE_PROMPT_DESCRIPTION}</p>
      </div>

      <div className="p-4 m-4 bg-[#121212] rounded-xl w-full md:w-1/2 shadow-gray-700 shadow-2xl">
        <h2 className="mb-4 text-3xl font-bold text-center">Conversations</h2>

        <div className="overflow-y-scroll rounded-xl">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
