import { Heart } from "lucide-react";

const LikeBtn = ({ isLiked }: { isLiked: boolean }) => {
  function handleLike() {
    console.log("handle like and dislike here");
  }
  return (
    <button onClick={handleLike}>
      <Heart
        className="cursor-pointer active:scale-95 hover:scale-110 transition-all text-slate-500"
        size="20"
        fill={isLiked ? "red" : "transparent"}
      />
    </button>
  );
};

export { LikeBtn };
