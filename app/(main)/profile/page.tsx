"use client";
import Link from "next/link";
import { getInfo } from "@/services/login";
import { updateDescription, updateAvatar } from "@/services/profile";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useUserInfo } from "@/hooks/useUserInfo";
import { BeatLoader, PulseLoader } from "react-spinners";
const baseImgUrl = process.env.NEXT_PUBLIC_APP_BASE_API;

const Profile = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getInfo()
      .then((res: any) => {
        const { code, user } = res;
        if (code === 200) {
          setUserInfo(user);
          setDescription(user.description || "");
          console.log(user);
        } else {
          router.push("/login");
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
        setUserInfo({ ...userInfo, description });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("更新签名失败:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#3b82f6" size={10} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-8 bg-gray-50 relative">
      {/* 设置图标 */}
      <Link
        href="/settings"
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <Settings size={24} />
      </Link>

      {/* 头像和用户名部分 */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 overflow-hidden mb-4 relative group rounded-md">
          <img
            src={
              userInfo?.avatar
                ? `${baseImgUrl}${userInfo?.avatar}`
                : "/images/default_avatar.jpg"
            }
            alt="用户头像"
            className="w-20 h-20 object-cover"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const res = (await updateAvatar(file)) as any;
                    if (res.code === 200) {
                      setUserInfo({ ...userInfo, avatar: res.imgUrl });
                    } else {
                      toast("上传头像失败：" + res.msg);
                    }
                  } catch (error) {
                    console.error("上传头像失败:", error);
                    toast("上传头像失败，请稍后重试");
                  }
                }
              }}
            />
            <span className="text-white">更换头像</span>
          </label>
        </div>
        <h1 className="text-xl font-bold mb-2">{userInfo?.nickName}</h1>
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
                  setDescription(userInfo?.description || "");
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
              {userInfo?.description || "这个人很懒，什么都没写"}
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
          href="/favorites"
          className="flex-1 py-3 bg-gray-200 text-center rounded-md hover:bg-gray-300"
        >
          我的收藏
        </Link>
        <Link
          href="/publish"
          className="flex-1 py-3 bg-gray-200 text-center rounded-md hover:bg-gray-300"
        >
          发布文章
        </Link>
        <Link
          href="/myPosts"
          className="flex-1 py-3 bg-gray-200 text-center rounded-md hover:bg-gray-300"
        >
          我的发帖
        </Link>
      </div>
    </div>
  );
};

export default Profile;
