"use client";
import { useParams, useRouter } from "next/navigation";
import { getProjectArticleDetail } from "@/services/projectArticle";
import { useEffect, useState } from "react";
import { ProjectArticle } from "@/types/projectArticle";
import { Star } from "lucide-react";
import dayjs from "dayjs";
import { NavigationHeader } from "@/components/NavigationHeader";
import { toggleArticleFavorite } from "@/services/favorite";
import { BeatLoader } from "react-spinners";

const ProjectArticlePage = () => {
  const { articleId } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<ProjectArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProjectArticleDetail(Number(articleId))
      .then((res: any) => {
        const { code, data, msg } = res;
        if (code === 200) {
          setArticle(data);
          setIsFavorited(data.isFavorited);
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
        <BeatLoader color="#3b82f6" size={10} />
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

  const handleToggleFavorite = async () => {
    try {
      const res = (await toggleArticleFavorite(
        Number(articleId),
        !isFavorited,
        2
      )) as any;
      if (res.code === 200) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("收藏失败", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      <div className="pt-16 px-4 pb-4">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <span>{dayjs(article.publishDate).format("YYYY年MM月DD日")}</span>
          <div className="mb-4 flex items-center space-x-4">
            <span>阅读 {article.viewCount}</span>
            <span>点赞 {article.likeCount}</span>
            <span>评论 {article.commentCount}</span>
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center space-x-1 ${
                isFavorited ? "text-yellow-500" : "text-gray-500"
              }  transition-colors`}
            >
              <Star size={16} fill={isFavorited ? "currentColor" : "none"} />
              <span>{isFavorited ? "已收藏" : "收藏"}</span>
            </button>
          </div>
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

export default ProjectArticlePage;
