import React from "react";

// components
import BaseLayout from "@/components/BaseLayout";

import {
  HOMEPAGE_CONVERSATION_TITLE,
  HOMEPAGE_CONVERSATION_DESCRIPTION,
  HOMEPAGE_PROMPT_TITLE,
  HOMEPAGE_PROMPT_DESCRIPTION,
} from "@/lib/constants";

function HomePage() {
  return (
    <BaseLayout layoutTitle={"YAChatGPT"}>
      <div className="flex flex-col justify-center items-center px-2 text-white lg:overflow-hidden">
        <div className="p-4 m-4 w-full rounded-xl bg-brand-additional-elements md:w-1/2 shadow-gray-700">
          <h2 className="mb-4 text-3xl font-medium font-brand-roboto">
            {HOMEPAGE_CONVERSATION_TITLE}
          </h2>
          <p className="font-brand-roboto">
            {HOMEPAGE_CONVERSATION_DESCRIPTION}
          </p>
        </div>

        <div className="p-4 m-4 w-full rounded-xl bg-brand-additional-elements md:w-1/2 shadow-gray-700">
          <h2 className="mb-4 text-3xl font-medium font-brand-roboto">
            {HOMEPAGE_PROMPT_TITLE}
          </h2>
          <p className="font-brand-roboto">{HOMEPAGE_PROMPT_DESCRIPTION}</p>
        </div>
      </div>
    </BaseLayout>
  );
}

export default HomePage;
