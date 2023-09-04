import React from "react";

import {
  HOMEPAGE_TITLE,
  HOMEPAGE_CONVERSATION_TITLE,
  HOMEPAGE_CONVERSATION_DESCRIPTION,
  HOMEPAGE_PROMPT_TITLE,
  HOMEPAGE_PROMPT_DESCRIPTION,
} from "@/lib/constants";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 overflow-hidden text-white">
      <h1 className="mb-20 text-5xl font-bold">{HOMEPAGE_TITLE}</h1>

      <div className="p-4 m-4 bg-[#434654] rounded-xl max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold ">
          {HOMEPAGE_CONVERSATION_TITLE}
        </h2>
        <p>{HOMEPAGE_CONVERSATION_DESCRIPTION}</p>
      </div>

      <div className="p-4 m-4 bg-[#434654] rounded-xl max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold ">{HOMEPAGE_PROMPT_TITLE}</h2>
        <p>{HOMEPAGE_PROMPT_DESCRIPTION}</p>
      </div>
    </div>
  );
}

export default HomePage;
