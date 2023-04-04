/*
Project : Custom NextAuth.js Adapter using xBeshClient
Description : This is the configuration file for NextAuth.js authentication library. It sets up the custom xBeshAdapter as the
adapter for user account and session management, and specifies the authentication providers and callbacks for
the library. It also uses the CredentialsProvider to allow users to authenticate with email and password.
Author : Madhav Dutta
Email : madhav@xbesh.com
Web : https://xbesh.com
Created : April 4th, 2023
Last Updated: April 5th, 2023
Version : 1.0.0
License : MIT
*/


import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {xBeshAdapter} from "./xbesh.adapter";
import {xBeshClient} from "../Client/xbesh.client";

export const authOptions: NextAuthOptions = {
  adapter: xBeshAdapter as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) return null;

        const res = await xBeshClient().getUserByCredentials(
          credentials.email,
          credentials.password
        );

        if (res.response) {
          console.log("Invalid credentials");
          return null;
        }

        const user = await res;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      session.user = token;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }

      return {
        ...token,
        // Set the JWT cookie to be HTTP-only
        cookie: {
          httpOnly: true
        }
      };
    },
  },
};
