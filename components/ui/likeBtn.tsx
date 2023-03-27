import { accessToken } from "@/config/constants";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import { useMutation, useQuery } from "react-query";

// user should be retrieved from session
const toggleLikePhoto = async (id: string) => {
  const res = await fetch("http://localhost:3000/api/users/muser1", {
    method: "PATCH",
    body: JSON.stringify({
      imgId: id,
    }),
    headers: {
      Authorization: `Client-ID ${accessToken}`,
    },
  });

  return res.json();
};

const LikeBtn = ({ id }: { id: string }) => {
  const [like, setLike] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  // const { data: resp, mutate} = useMutation("toggleLike", () => toggleLikePhoto(id));

  function handleLike() {
    toggleLikePhoto(id);
    setLike(!like);
  }

  useEffect(() => {
    if (session?.user?.likedImages && session?.user?.likedImages.includes(id))
      setLike(true);
  }, []);

  return (
    <button onClick={handleLike}>
      <Heart
        className="cursor-pointer active:scale-95 hover:scale-110 transition-all text-slate-500"
        size="20"
        fill={like ? "red" : "transparent"}
      />
    </button>
  );
};

export { LikeBtn };
