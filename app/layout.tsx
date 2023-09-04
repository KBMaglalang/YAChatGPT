import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// components
import Login from "@/components/Login";
import SideBar from "@/components/SideBar";
import PromptBar from "@/components/PromptBar";

import { SessionProvider } from "@/components/SessionProvider";
import { StateProvider } from "@/lib/context/stateContext";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: "YAChatGPT",
  description:
    "Enhance your experience with our ChatGPT frontend. Store messages, create prompt templates, switch models, and modify responses easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <StateProvider>
              <div className="flex">
                {/* client provider - notification  */}
                <ClientProvider />

                <div className="bg-[#121212] max-w-xs h-screen overflow-y-scroll md:min-w-[20rem]">
                  <SideBar />
                </div>

                <div className="bg-[#212121] flex-1">{children}</div>

                <div className="bg-[#121212] max-w-xs h-screen overflow-y-scroll md:min-w-[20rem]">
                  <PromptBar />
                </div>
              </div>
            </StateProvider>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}

/*
  ! note: getServerSession is still experimental
*/
