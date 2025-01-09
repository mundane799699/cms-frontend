"use client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProjectArticleList } from "@/services/projectArticle";
import { useEffect, useState } from "react";
import { ProjectArticle } from "@/types/projectArticle";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

const ProjectArticles = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const router = useRouter();
  const [articleList, setArticleList] = useState<ProjectArticle[]>([]);
  useEffect(() => {
    getProjectArticleList(Number(projectId)).then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setArticleList(data);
      } else {
        console.error(msg);
      }
    });
  }, []);

  const handleClick = (id: number) => {
    router.push(`/projectArticles/${id}`);
  };

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
        <div className="flex flex-col gap-4">
          {articleList.map((article) => (
            <div
              key={article.id}
              className="text-gray-600 bg-gray-100 p-4 rounded-lg cursor-pointer mb-4"
              onClick={() => handleClick(article.id)}
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
    </div>
  );
};

export default ProjectArticles;
