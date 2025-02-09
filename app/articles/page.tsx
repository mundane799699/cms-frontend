"use client";

import { getArticleCategory, getArticleList } from "@/services/article";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronsUpDown } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import dayjs from "dayjs";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

type Category = {
  id: number;
  categoryName: string;
};

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    getArticleList(selectedCategoryId, null, 1).then((res: any) => {
      const { data, code, msg } = res;
      if (res.code === 200) {
        setArticles(data);
      }
    });
  }, [selectedCategoryId]);

  useEffect(() => {
    getArticleCategory().then((res: any) => {
      const { data, code, msg } = res;
      if (res.code === 200) {
        setCategories(data);
      }
    });
  }, []);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategory(categories.find((c) => c.id === categoryId) || null);
  };

  return (
    <div className="h-full bg-white">
      <div className="flex h-14 justify-between items-center fixed top-0 left-0 w-full p-4 bg-white border-b z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft size={24} />
          <span className="ml-1">返回</span>
        </button>

        <Listbox value={selectedCategoryId} onChange={handleCategoryChange}>
          <div className="relative w-36">
            <Listbox.Button className="relative w-full px-4 py-2 text-left bg-white border rounded-lg cursor-pointer focus:outline-none">
              <span className="block truncate">
                {selectedCategory?.categoryName || "全部"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown className="w-5 h-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Listbox.Option
                  value={null}
                  className={({ active }) =>
                    `${active ? "bg-blue-100 text-blue-900" : "text-gray-900"}
            cursor-pointer select-none relative py-2 pl-4 pr-4`
                  }
                >
                  全部
                </Listbox.Option>
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    value={category.id}
                    className={({ active }) =>
                      `${active ? "bg-blue-100 text-blue-900" : "text-gray-900"}
              cursor-pointer select-none relative py-2 pl-4 pr-4`
                    }
                  >
                    {category.categoryName}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
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
