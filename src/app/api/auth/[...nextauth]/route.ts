import NextAuth from "next-auth";
// import { authOptions } from "@/config/auth/auth";
// import { authOptions } from "@/config/auth";
import { authOptions } from "@/config/auth/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
