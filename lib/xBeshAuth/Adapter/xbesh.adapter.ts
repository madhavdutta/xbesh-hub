/*

Project     :   xbesh-hub
Description :   This is an implementation of a custom adapter for NextAuth.js authentication library, 
                using a custom xBeshClient. It exports an object with async methods that handle user account management 
                and session management. These methods are used to create, read, update, and delete user accounts, 
                as well as manage user sessions. The adapter works together with the NextAuth middleware to provide 
                a complete authentication solution for a web application.
Author      :   Madhav Dutta
Email       :   madhav@xbesh.com
Web         :   https://xbesh.com
Created     :   April 4th, 2023
Last Updated:   April 5th, 2023
Version     :   1.0.0
License     :   MIT

*/

import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import {xBeshClient} from "../Client/xbesh.client";
import { User, Account } from "../Types/auth";
// const url = process.env.NEXTAUTH_URL;

export function xBeshAdapter(): Adapter {
  return {
    async createUser(user: Omit<Account, "id">) {
      return await xBeshClient().createUser(user);
    },
    async getUser(id: string) {
      return await xBeshClient().getUser(id);
    },
    async getUserByEmail(email: string) {
      return await xBeshClient().getUser(email);
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }: Pick<User, "provider" | "providerAccountId">) {
      return await xBeshClient().getUserByAccount(providerAccountId, provider);
    },
    async updateUser(user: Partial<AdapterUser>) {
      return await xBeshClient().updateUser(user);
    },
    async deleteUser(userId: string) {
      return await xBeshClient().deleteUser(userId);
    },
    async linkAccount(account: AdapterAccount) {
      return await xBeshClient().linkAccount(account);
    },
    async unlinkAccount({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) {
      return await xBeshClient().unlinkAccount({ providerAccountId, provider });
    },
    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) {
      return await xBeshClient().createSession(
        session.sessionToken,
        session.userId,
        session.expires
      );
    },
    async getSessionAndUser(sessionToken: string) {
      return await xBeshClient().getSessionAndUser(sessionToken);
    },
    async updateSession({ sessionToken }) {
      return await xBeshClient().updateSession({ sessionToken });
    },
    async deleteSession(sessionToken: string) {
      return await xBeshClient().deleteSession(sessionToken);
    },
    async createVerificationToken({
      identifier,
      expires,
      token,
    }: VerificationToken) {
      return await xBeshClient().createVerificationToken({
        identifier,
        expires,
        token,
      });
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }) {
      return await xBeshClient().useVerificationToken({ identifier, token });
    },
  };
}
