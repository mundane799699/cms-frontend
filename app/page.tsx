"use client";

import { getKeyword } from "@/services/keyword";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";

export default function Home() {
  const [keyword, setKeyword] = useState({
    keywordContent: "",
    publishDate: "",
  });

  useEffect(() => {
    getKeyword().then((res: any) => {
      if (res.code === 200) {
        setKeyword(res.data);
      } else {
        console.error(res.msg);
      }
    });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center">
        <div className="text-lg">{keyword.publishDate}</div>
        <div className="bg-gray-200 px-4 py-1 rounded">历史记录</div>
      </div>

      <div className="flex justify-center items-center mt-32">
        <div className="text-4xl">{keyword.keywordContent}</div>
      </div>

      <div className="flex justify-end mt-8">
        <BsChatDots size={32} />
      </div>
    </div>
  );
}
