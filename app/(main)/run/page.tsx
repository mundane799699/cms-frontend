"use client";

import { getProjectList } from "@/services/project";
import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const Run = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
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

    getProjectList().then((res: any) => {
      const { data, code } = res;
      if (code === 200) {
        setProjects(data);
      }
    });
  }, [initialized, userInfo]);

  const handleClick = (id: number) => {
    router.push(`/projectArticles?projectId=${id}`);
  };

  return (
    <div className="flex flex-col p-6 h-full overflow-y-auto space-y-4 bg-gray-50">
      {projects.map((project) => (
        <div
          onClick={() => handleClick(project.id)}
          key={project.id}
          className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 cursor-pointer"
        >
          <img
            src={`${baseImgUrl}${project.coverImage}`}
            alt={project.title}
            className="object-cover w-24 h-24 rounded-md"
          />
          <div className="flex flex-col ml-4 flex-1">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {project.title}
            </h1>
            <p className="text-gray-600 line-clamp-2">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Run;
