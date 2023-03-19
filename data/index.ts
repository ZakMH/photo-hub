import { User } from "@/types";

const users: User[] = [
  { username: "muser1", password: "mpassword1", isBlocked: false, likedImages: [] },
  { username: "muser2", password: "mpassword2", isBlocked: false, likedImages: [] },
  { username: "muser3", password: "mpassword3", isBlocked: true, likedImages: [] },
];

export default users;
