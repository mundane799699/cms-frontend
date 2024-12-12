"use client";
import Link from "next/link";
import { getInfo } from "@/services/login";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInfo()
      .then((res: any) => {
        const { code, user } = res;
        if (code === 200) {
          setUser(user);
          console.log(user);
        } else {
          router.push("/profile/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      {/* 头像和用户名部分 */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <Image
            src={user?.avatar || "/images/default_avatar.jpg"} // 替换为实际的猫咪头像图片路径
            alt="用户头像"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mb-2">{user?.nickName}</h1>
        <p className="text-gray-600 text-center">
          {user?.description || "这个人很懒，什么都没写"}
        </p>
      </div>

      {/* 收藏和发帖按钮 */}
      <div className="flex gap-4 w-full max-w-md">
        <Link
          href="/profile/collections"
          className="flex-1 py-3 bg-gray-200 text-center rounded-md hover:bg-gray-300"
        >
          我的收藏
        </Link>
        <Link
          href="/profile/posts"
          className="flex-1 py-3 bg-gray-200 text-center rounded-md hover:bg-gray-300"
        >
          我的发帖
        </Link>
      </div>
    </div>
  );
};

export default Profile;
