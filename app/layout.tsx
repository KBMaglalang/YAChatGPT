import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

import { SessionProvider } from "@/components/SessionProvider";
import { StateProvider } from "@/lib/context/stateContext";
import ClientProvider from "@/components/ClientProvider";

import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from "@/lib/constants";

export const metadata = {
  title: { WEBSITE_TITLE },
  description: { WEBSITE_DESCRIPTION },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${roboto.variable}  font-sans`}>
        <SessionProvider>
          <StateProvider>
            <div className="flex justify-center w-screen h-screen">
              {/* client provider - notification  */}
              <ClientProvider />
              {children}
            </div>
          </StateProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

/*
  ! note: getServerSession is still experimental
*/
