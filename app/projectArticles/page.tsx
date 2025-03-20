"use client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProjectArticleList } from "@/services/projectArticle";
import { useEffect, useState, Suspense } from "react";
import { ProjectArticle } from "@/types/projectArticle";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { NavigationHeader } from "@/components/NavigationHeader";
import { getArticleList } from "@/services/article";
import { useUserInfo } from "@/hooks/useUserInfo";
import { BeatLoader } from "react-spinners";

const ProjectArticleContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const router = useRouter();
  const [articleList, setArticleList] = useState<ProjectArticle[]>([]);
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
    getArticleList(null, Number(projectId), 2).then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setArticleList(data);
      } else {
        console.error(msg);
      }
    });
  }, [initialized, userInfo, projectId]);

  const handleClick = (id: number) => {
    router.push(`/articles/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
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

const ProjectArticles = () => {
  return (
    <Suspense
      fallback={
        <div>
          <BeatLoader color="#3b82f6" size={10} />
        </div>
      }
    >
      <ProjectArticleContent />
    </Suspense>
  );
};

export default ProjectArticles;
