import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "@/types";
import users from "@/data";
import { Level } from "level";
// import { JWT } from "next-auth/jwt";

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

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "photo-hub",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password,
        };
        let user = null;

        if (payload?.username) {
          await db.open();
          const res = await db.get(payload?.username);
          user = JSON.parse(res);
          await db.close();
        }

        if (user.password !== payload.password) throw new Error("Bad credentials");

        if (user.isBlocked) throw new Error("user is Blocked");

        // If no error and we have user data, return it
        if (user) return user;

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      const { password, ...rest } = token.user;
      session.user = rest;
      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
