"use client";
import Link from "next/link";
import { getInfo } from "@/services/login";
import { updateDescription } from "@/services/profile";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { Settings } from "lucide-react";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setLoading(true);
    getInfo()
      .then((res: any) => {
        const { code, user } = res;
        if (code === 200) {
          setUser(user);
          setDescription(user.description || "");
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

  const handleUpdateDescription = async () => {
    try {
      const res = (await updateDescription(description)) as any;
      if (res.code === 200) {
        setUser({ ...user, description });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("更新签名失败:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-4xl">加载中...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-8 bg-gray-100 relative">
      {/* 设置图标 */}
      <Link
        href="/profile/settings"
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <Settings size={24} />
      </Link>

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
        {isEditing ? (
          <div className="flex flex-col items-center gap-2">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md w-64"
              placeholder="请输入个性签名"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdateDescription}
                className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setDescription(user?.description || "");
                }}
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <p className="text-gray-600 text-center">
              {user?.description || "这个人很懒，什么都没写"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✏️
            </button>
          </div>
        )}
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
