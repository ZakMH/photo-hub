import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    likedImages: string[];
    isBlocked: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken: string;
//     refreshToken: string;
//     accessTokenExpires: string;
//   }
// }
