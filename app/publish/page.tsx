"use client";

import { NavigationHeader } from "@/components/NavigationHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiClient from "@/services/apiClient";
import { Upload } from "lucide-react";
import { uploadFile } from "@/services/common";
import { Category } from "@/types/category";
import { getArticleCategory, publishArticle } from "@/services/article";
import { Project } from "@/types/project";
import { getProjectList } from "@/services/project";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const PublishPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getArticleCategory().then((res: any) => {
      const { data, code, msg } = res;
      if (code === 200) {
        setCategories(data);
      }
    });

    getProjectList().then((res: any) => {
      const { data, code } = res;
      if (code === 200) {
        setProjects(data);
      }
    });
  }, []);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = (await uploadFile(file)) as any;
        if (res.code === 200) {
          setPreviewUrl(res.fileName);
        } else {
          toast("上传封面失败：" + res.msg);
        }
      } catch (error) {
        console.error("上传封面失败:", error);
        toast("上传封面失败，请稍后重试");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("请输入标题");
      return;
    }
    if (!content.trim()) {
      toast.error("请输入内容");
      return;
    }
    if (!previewUrl) {
      toast.error("请上传封面");
      return;
    }
    if (type === 2 && !selectedId) {
      toast.error(`请选择项目`);
      return;
    }

    setLoading(true);

    try {
      const data = {
        title,
        content,
        type,
        coverImage: previewUrl,
        [type === 1 ? "categoryId" : "projectId"]: selectedId,
      };

      const res = (await publishArticle(data)) as any;

      if (res.code === 200) {
        toast.success("发布成功");
        router.back();
      } else {
        toast.error(res.data.msg || "发布失败");
      }
    } catch (error) {
      console.error("发布失败:", error);
      toast.error("发布失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader title="发布文章" />
      <div className="pt-16 px-4 pb-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请输入文章标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              封面图片
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {previewUrl ? (
                  <img
                    src={baseImgUrl + previewUrl}
                    alt="预览图"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                    />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">点击上传</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (建议尺寸: 1200x675)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              发布版块
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="type"
                  value={1}
                  checked={type === 1}
                  onChange={(e) => setType(Number(e.target.value))}
                />
                <span className="ml-2">思考</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="type"
                  value={2}
                  checked={type === 2}
                  onChange={(e) => setType(Number(e.target.value))}
                />
                <span className="ml-2">陪跑</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 1 ? "分类" : "项目"}
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleSelectChange}
            >
              <option value="">请选择{type === 1 ? "分类" : "项目"}</option>
              {type === 1
                ? categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))
                : projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请输入文章内容"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "发布中..." : "发布"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
