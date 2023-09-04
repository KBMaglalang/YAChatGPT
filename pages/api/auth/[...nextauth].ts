import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOODLE_ID!, // * note: the '!' shows that the value is going to be there assured
      clientSecret: process.env.GOOGLE_SECRET!, // * note: the '!' shows that the value is going to be there assured
    }),
  ],
};

export default NextAuth(authOptions);
