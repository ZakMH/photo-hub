// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/types";
import users from "@/data";
import { Level } from "level";
let executed = false;

//TODO: refactor into layers

async function createUser(db: Level<string, string>, user: User) {
  return await db.put(user.username, JSON.stringify(user));
}

const db = new Level("./photo-hub-db");

((db: Level<string, string>) => {
  if (!executed) {
    users.forEach(async (user) => await createUser(db, user));
    console.log("Function executed !!");
    executed = true;
  }
})(db);

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, body } = req;
  const { username } = query;
  const { imgId } = body;

  if (req.method === "GET") {
    try {
      await db.open();
      const user = await db.get(username as string);
      res.status(200).json({ user: JSON.parse(user) });
      await db.close();
    } catch (error) {
      res.status(400).json({ err: "User not found!" });
    }
  }

  if (req.method === "PATCH") {
    await db.open();
    const u = await db.get(username as string);
    const user = JSON.parse(u);
    const likedImages = user.likedImages;

    if (!likedImages.includes(imgId)) {
      likedImages.push(imgId);
    } else {
      const index = likedImages.indexOf(imgId);
      if (index !== -1) {
        likedImages.splice(index, 1);
      }
    }
    user.likedImages = likedImages;
    await db.put(username as string, JSON.stringify(user));
    res.status(200).json({ user });
    await db.close();
  }
}
