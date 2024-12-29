"use client";

import { getArticleList } from "@/services/article";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import dayjs from "dayjs";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getArticleList().then((res: any) => {
      const { data, code, msg } = res;
      if (res.code === 200) {
        setArticles(data);
      }
    });
  }, []);

  return (
    <div className="h-full bg-white">
      <div className="fixed top-0 left-0 w-full p-4 bg-white border-b z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft size={24} />
          <span className="ml-1">返回</span>
        </button>
      </div>
      <div className="pt-16 px-4 pb-4">
        {articles.map((article: any) => (
          <div
            key={article.id}
            className="text-gray-600 bg-gray-100 p-4 rounded-lg cursor-pointer mb-4"
            onClick={() => router.push(`/articles/${article.id}`)}
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
}
