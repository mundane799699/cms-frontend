"use client";

import { getHistory } from "@/services/keyword";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { History } from "@/types/HistoryType";
import dayjs from "dayjs";

const HistoryPage = () => {
  const router = useRouter();
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    getHistory().then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setHistory(data);
      } else {
        console.error(msg);
      }
    });
  }, []);

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

      <div className="pt-16">
        {history.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => router.push(`/keyword/${item.id}`)}
              className="flex justify-between p-4 border-b hover:bg-gray-100"
            >
              <div>{dayjs(item.publishDate).format("YYYY年MM月DD日")}</div>
              <div>{item.keywordContent}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
