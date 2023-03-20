import Image from "next/image";
import { LikeBtn } from "@/components/ui";

interface CardProps {
  imageUrl: string;
  likes: number;
  isLiked: boolean;
  username: string;
}

export const Card = ({ imageUrl, isLiked, likes, username }: CardProps) => {
  return (
    <div className="space-y-2 bg-slate-50 p-2 hover:bg-slate-100 transition-all rounded-md">
      <figure className="rounded-md overflow-hidden h-60 cursor-pointer">
        <Image
          src={imageUrl}
          width={512}
          height={512}
          alt=""
          className="aspect-square object-cover w-full"
        />
      </figure>
      <div className="flex justify-between items-center px-2">
        <p className="text-sm font-medium">{username}</p>
        <div className="flex gap-2 items-center">
          <LikeBtn isLiked={isLiked} />
          <p className="">{likes}</p>
        </div>
      </div>
    </div>
  );
};
