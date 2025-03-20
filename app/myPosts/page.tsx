"use client";

import { NavigationHeader } from "@/components/NavigationHeader";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMyPosts } from "@/services/article";
import { useUserInfo } from "@/hooks/useUserInfo";

const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const MyPosts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
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
    getMyPosts().then((res: any) => {
      const { data, code } = res;
      if (code === 200) {
        setPosts(data);
      }
    });
  }, [initialized, userInfo]);

  const handleClick = (article: any) => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <NavigationHeader />
      <div className="pt-16 px-4 pb-4">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="text-gray-600 bg-gray-100 p-4 rounded-lg cursor-pointer mb-4"
            onClick={() => handleClick(post)}
          >
            <div className="mb-4">
              {dayjs(post.publishDate).format("YYYY年MM月DD日")}
            </div>
            {post.coverImage && (
              <div className="relative w-full h-48 mb-4">
                <img
                  src={`${baseImgUrl}${post.coverImage}`}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
