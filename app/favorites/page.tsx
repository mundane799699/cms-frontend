"use client";

import { NavigationHeader } from "@/components/NavigationHeader";
import { getFavoriteList } from "@/services/favorite";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const FavoritesPage = () => {
  const router = useRouter();
  const [favoriteList, setFavoriteList] = useState([]);
  const { userInfo, initialized, initialize } = useUserInfo();
  useEffect(() => {
    if (!initialized) {
      initialize();
      return;
    }
    if (!userInfo) {
      router.push("/login");
      return;
    }
    getFavoriteList().then((res: any) => {
      const { data, code } = res;
      if (code === 200) {
        setFavoriteList(data);
      }
    });
  }, [initialized, userInfo]);

  const handleClick = (article: any) => {
    const { articleId } = article;
    router.push(`/articles/${articleId}`);
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <NavigationHeader />
      <div className="pt-16 px-4 pb-4">
        {favoriteList.map((article: any) => (
          <div
            key={article.id}
            className="text-gray-600 bg-gray-100 p-4 rounded-lg cursor-pointer mb-4"
            onClick={() => handleClick(article)}
          >
            <div className="mb-4">
              {dayjs(article.publishDate).format("YYYY年MM月DD日")}
            </div>
            {article.coverImage && (
              <div className="relative w-full h-48 mb-4">
                <img
                  src={`${baseImgUrl}${article.coverImage}`}
                  alt={article.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">{article.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
