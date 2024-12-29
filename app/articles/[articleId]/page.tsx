"use client";

import { getArticleDetail } from "@/services/article";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

interface Article {
  id: number;
  title: string;
  coverImage: string;
  content: string;
  createTime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const ArticlePage = () => {
  const { articleId } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getArticleDetail(Number(articleId))
      .then((res: any) => {
        const { code, data, msg } = res;
        if (code === 200) {
          setArticle(data);
        } else {
          console.error(msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl">加载中...</h1>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl">文章不存在</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full p-4 bg-white border-b">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft size={24} />
          <span className="ml-1">返回</span>
        </button>
      </div>
      <div className="pt-16 px-4 pb-4">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <div className="text-sm text-gray-500 mb-4 flex items-center space-x-4">
          <span>{dayjs(article.createTime).format("YYYY年MM月DD日")}</span>
          <span>阅读 {article.viewCount}</span>
          <span>点赞 {article.likeCount}</span>
          <span>评论 {article.commentCount}</span>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
