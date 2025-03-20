"use client";

import { getHistory } from "@/services/keyword";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { History } from "@/types/HistoryType";
import dayjs from "dayjs";
import { NavigationHeader } from "@/components/NavigationHeader";
import { useUserInfo } from "@/hooks/useUserInfo";

const HistoryPage = () => {
  const router = useRouter();
  const [history, setHistory] = useState<History[]>([]);
  const { userInfo, initialized, initialize } = useUserInfo();

  useEffect(() => {
    if (!initialized) {
      initialize();
      return;
    }
    if (!userInfo) {
      router.push("/profile/login");
      return;
    }
    getHistory().then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setHistory(data);
      } else {
        console.error(msg);
      }
    });
  }, [initialized, userInfo]);

  return (
    <div className="h-full bg-white overflow-y-auto">
      <NavigationHeader />

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
