/*

Project     :   xbesh-hub
Description :   This code is an implementation of a client for interacting with a remote API that provides user 
                authentication and session management functionality. The client uses the PocketBase library to send HTTP requests to the API, which is assumed to be running at the URL specified in the NEXT_PUBLIC_API_URL environment variable. The client provides several methods for creating, reading, updating, and deleting user accounts, as well as linking and unlinking third-party authentication providers (such as Google or Facebook), creating and managing sessions, and creating and using verification tokens.Some of the methods provided by the client include createUser, getUser, getUserByEmail, getUserByAccount, updateUser, deleteUser, linkAccount, unlinkAccount, createSession, getSessionAndUser, updateSession, deleteSession, createVerificationToken, and useVerificationToken. The client also includes a commented-out implementation of a getUserByCredentials method, which would allow users to authenticate with an email and password. This method uses PocketBase's authWithPassword method to authenticate the user and return their user data and authentication token. The client returns any errors that occur during API requests as ClientResponseError objects, which may contain information about the HTTP response status code, headers, and body.
Author      :   Madhav Dutta
Email       :   madhav@xbesh.com
Web         :   https://xbesh.com
Created     :   April 4th, 2023
Last Updated:   April 5th, 2023
Version     :   1.0.0
License     :   MIT

*/

import { xBeshClientType } from "../../xBeshAuth/Types/auth";
import { User as UserAccount, Account } from "../../xBeshAuth/Types/auth";
import { AdapterAccount, VerificationToken } from "next-auth/adapters";

import PocketBase, { ClientResponseError } from "pocketbase";
const url = process.env.NEXT_PUBLIC_API_URL as string;
const xbClient = new PocketBase(url);

export const xBeshClient = (): xBeshClientType => {
  return {
    async createUser(user: Omit<Account, "id">) {
      try {
        const result = await xbClient.collection("users").create(user);
        await xbClient.collection("users").requestVerification(user.email);
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async getUser( id : string) {
      try {
        const result = await xbClient.collection("users").getOne(String(id));
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async getUserByEmail( email : string) {
      try {
        await xbClient.collection("users").getFirstListItem('email == "' + email + '"');
        const response = xbClient.authStore.model;
        return response;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async getUserByAccount(providerAccountId:string, provider:string) {
      try {
        const result = await xbClient.collection("users").getList(1, 1, {
          filter:
            'provider == "' +
            provider +
            '" && providerAccountId == "' +
            providerAccountId +
            '"',
        });
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async updateUser(user: UserAccount) {
      try {
        const result = await xbClient
          .collection("users")
          .update(String(user.id), user);
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async deleteUser(userId: string) {
      try {
        const result = await xbClient
          .collection("users")
          .delete(String(userId));
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async linkAccount(account: UserAccount) {
      try {
        const result = await xbClient
          .collection("users")
          .update(String(account.id), account);
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async unlinkAccount({ providerAccountId, provider }: Pick<AdapterAccount, "provider" | "providerAccountId">) {
      try {
        const result = await xbClient
          .collection("users")
          .update(String(providerAccountId), provider);
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async createSession(sessionToken:string, userId:string, expires:Date) {
      try {
        const result = await xbClient.collection("sessions").create({
          sessionToken,
          userId,
          expires,
        });
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async getSessionAndUser( token : string) {
      try {
        const result = await xbClient
          .collection("sessions")
          .getOne(String(token));
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async updateSession({ sessionToken }: UserAccount) {
      try {
        const result = await xbClient
          .collection("sessions")
          .update(String(sessionToken), sessionToken);
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async deleteSession(sessionToken: string) {
      try {
        const result = await xbClient
          .collection("sessions")
          .delete(String(sessionToken));
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async createVerificationToken({ identifier, expires, token }: VerificationToken) {
      try {
        const result = await xbClient.collection("verificationTokens").create({
          identifier,
          expires,
          token,
        });
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async useVerificationToken({ identifier, token }: any) {
      try {
        const result = await xbClient
          .collection("verificationTokens")
          .getOne(String(token));
          if(identifier == result.identifier){
          }
        return result;
      } catch (error) {
        return error as ClientResponseError;
      }
    },

    async getUserByCredentials(email: string, password: string) {
      try {
        const { record, token } = await xbClient.collection('users').authWithPassword(email, password);
        return { id: record.id, name: record.name, email: record.email, image: record.image, token };
      } catch (error) {
        return error as ClientResponseError;
      }
    },
    

  };
};