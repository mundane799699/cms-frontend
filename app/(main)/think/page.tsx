"use client";

import { getArticleList } from "@/services/article";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useArticleStore } from "@/hooks/articleStore";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const Think = () => {
  const router = useRouter();
  const { articles, currentArticle, setArticles, setCurrentArticle } =
    useArticleStore();

  useEffect(() => {
    if (articles.length === 0) {
      getArticleList(null, null, 1).then((res: any) => {
        const { data, code } = res;
        if (code === 200) {
          setArticles(data);
          if (data.length > 0 && !currentArticle) {
            setCurrentArticle(data[0]);
          }
        }
      });
    }
  }, []);

  if (!currentArticle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl">加载中...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-full overflow-y-auto bg-gray-50">
      <div
        className="text-gray-600 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 cursor-pointer"
        onClick={() => {
          router.push(`/articles/${currentArticle.id}`);
        }}
      >
        <div className="mb-4">
          {dayjs(currentArticle.publishDate).format("YYYY年MM月DD日")}
        </div>
        {currentArticle.coverImage && (
          <div className="relative w-full h-48 mb-4">
            <img
              src={`${baseImgUrl}${currentArticle.coverImage}`}
              alt={currentArticle.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold">{currentArticle.title}</h1>
      </div>

      <div className="flex justify-between mt-auto">
        <button
          className="px-6 py-2 bg-gray-200 rounded-md"
          onClick={() => {
            const currentIndex = articles.findIndex(
              (a) => a.id === currentArticle.id
            );
            if (currentIndex > 0) {
              setCurrentArticle(articles[currentIndex - 1]);
            } else {
              toast("✨ 已经是第一篇文章啦 ~", { duration: 1000 });
            }
          }}
        >
          上一篇
        </button>

        <button
          className="px-6 py-2 bg-gray-200 rounded-md"
          onClick={() => {
            router.push("/articles");
          }}
        >
          全部
        </button>

        <button
          className="px-6 py-2 bg-gray-200 rounded-md"
          onClick={() => {
            const currentIndex = articles.findIndex(
              (a) => a.id === currentArticle.id
            );
            if (currentIndex < articles.length - 1) {
              setCurrentArticle(articles[currentIndex + 1]);
            } else {
              toast("🌟 已经是最后一篇文章啦 ~", { duration: 1000 });
            }
          }}
        >
          下一篇
        </button>
      </div>
    </div>
  );
};

export default Think;
