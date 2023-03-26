import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "@/types";
import users from "@/data";
import { Level } from "level";

const db = new Level("./photo-hub-db");
// let executed = false;

async function createUser(db: Level<string, string>, user: User) {
  return await db.put(user.username, JSON.stringify(user));
}

(async (db: Level<string, string>) => {
  if (true) {
    await db.open();
    users.forEach(async (user) => await createUser(db, user));
    // executed = true;
    await db.close();
  }
})(db);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "photo-hub",
      credentials: {
        // TODO: switch email to username
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        let user = null;

        if (payload?.email) {
          await db.open();
          const res = await db.get(payload?.email);
          user = JSON.parse(res);
          await db.close();
        }

        console.log({ user });

        if (user.password !== payload.password) {
          throw new Error("Bad credentials");
        }

        if (user.isBlocked) throw new Error("User is Blocked");

        // If no error and we have user data, return it
        if (user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // if ( user) {
  //     //   // token.user = user
  //     //   return {
  //     //     ...token,
  //     //     // accessToken: user.token,
  //     //     // refreshToken: user.refreshToken,
  //     //   };
  //     // }

  //     return { ...token, ...user };
  //   },

  //   async session({ session, user, token }) {
  //     // if (session?.user) {
  //     //   // session.user = token.user;
  //     //   // session.user.accessToken = token.accessToken;
  //     //   // session.user.refreshToken = token.refreshToken;
  //     //   // session.user.accessTokenExpires = token.accessTokenExpires;
  //     // }

  //     return token;
  //   },
  // },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
