import React from "react";
import { getServerSession } from "next-auth";

// components
import { BaseLayout } from "@/components/Layout";
import { Login } from "@/components/Common";

// context or store

// constants or functions
import { authOptions } from "@/config/auth/auth";
import {
  HOMEPAGE_CONVERSATION_TITLE,
  HOMEPAGE_CONVERSATION_DESCRIPTION,
  HOMEPAGE_PROMPT_TITLE,
  HOMEPAGE_PROMPT_DESCRIPTION,
} from "@/constants";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center px-2 text-white lg:overflow-hidden">
        <div className="w-full p-4 m-4 rounded-xl  md:w-1/2 shadow-gray-700">
          <h2 className="mb-4 text-3xl font-medium text-center font-brand-roboto">
            {HOMEPAGE_CONVERSATION_TITLE}
          </h2>
          <p className="text-center font-brand-roboto">
            {HOMEPAGE_CONVERSATION_DESCRIPTION}
          </p>
        </div>

        <div className="w-full p-4 m-4 rounded-xl  md:w-1/2 shadow-gray-700">
          <h2 className="mb-4 text-3xl font-medium text-center font-brand-roboto">
            {HOMEPAGE_PROMPT_TITLE}
          </h2>
          <p className="text-center font-brand-roboto">
            {HOMEPAGE_PROMPT_DESCRIPTION}
          </p>
        </div>

        {!session && (
          <div className="w-full p-4 m-4 rounded-xl  md:w-1/2 shadow-gray-700">
            <h2 className="mb-4 text-2xl font-medium text-center font-brand-roboto">
              Login or Create an Account to Start
            </h2>
            <Login />
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
