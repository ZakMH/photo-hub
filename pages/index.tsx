import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { accessToken } from "@/config/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  //TODO: redo properly

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://api.unsplash.com/photos?page=1", {
        headers: {
          Authorization: `Client-ID ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    };

    getData().then((d) => setData(d));
  }, []);

  return (
    <main className="container">
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map(
          ({ id, likes, liked_by_user, user: { name }, urls: { regular } }) => (
            <Card
              key={id}
              imageUrl={regular}
              isLiked={liked_by_user}
              likes={likes}
              username={name}
            />
          )
        )}
      </div>
    </main>
  );
}

Home.auth = true;