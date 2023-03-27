import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { accessToken, baseURL } from "@/config/constants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

type Photo = {
  id: string;
  likes: number;
  liked_by_user: boolean;
  user: {
    name: string;
  };
  urls: {
    regular: string;
  };
};

const fetchPhotos = async (page: number) => {
  const res = await fetch(`${baseURL}/photos?page=${page}`, {
    headers: {
      Authorization: `Client-ID ${accessToken}`,
    },
  });

  return res.json();
};

export default function Home() {
  console.log(useSession().data?.user);
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "photos",
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (_, allPages) => {
        const nextPage = allPages.length + 1;
        // 20 pages just to avoid exceeding the API call limits
        return nextPage < 20 ? nextPage : undefined;
      },
    }
  );

  // can be achieved by using a third-part library
  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <main className="container">
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page.map(
            ({
              id,
              likes,
              liked_by_user,
              user: { name },
              urls: { regular },
            }: Photo) => (
              <Card
                key={id}
                imageUrl={regular}
                isLiked={liked_by_user}
                likes={likes}
                username={name}
              />
            )
          )
        )}
      </div>
    </main>
  );
}

Home.auth = true;
