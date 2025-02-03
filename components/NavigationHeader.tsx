"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavigationHeaderProps {
  title?: string;
  className?: string;
}

export const NavigationHeader = ({
  title = "返回",
  className = "",
}: NavigationHeaderProps) => {
  const router = useRouter();

  return (
    <div
      className={`fixed z-10 h-14 top-0 left-0 w-full p-4 bg-white border-b ${className}`}
    >
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft size={24} />
        <span className="ml-1">{title}</span>
      </button>
    </div>
  );
};
