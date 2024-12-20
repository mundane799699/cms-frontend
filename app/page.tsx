"use client";

import {
  getKeyword,
  getKeywordComment,
  postKeywordComment,
} from "@/services/keyword";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import dayjs from "dayjs";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getInfo } from "@/services/login";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { setUserInfo } = useUserInfo();
  const [keyword, setKeyword] = useState({
    id: null,
    keywordContent: "",
    publishDate: "",
  });
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getKeyword().then((res: any) => {
      if (res.code === 200) {
        setKeyword(res.data);
      } else {
        console.error(res.msg);
      }
    });

    getInfo()
      .then((res: any) => {
        const { code, user } = res;
        if (code === 200) {
          setUserInfo(user);
          setUser(user);
          console.log(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const expandComment = () => {
    if (!user) {
      // 弹出弹窗提示去登录
      setIsModalOpen(true);
      return;
    }
    if (keyword.id) {
      getKeywordComment(keyword.id).then((res: any) => {
        const { code, data, msg } = res;
        if (code === 200) {
          setComments(data);
          setShowComment(true);
        } else {
          console.error(msg);
        }
      });
    }
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    if (keyword.id && user) {
      postKeywordComment(keyword.id, commentText, user.userId, null).then(
        (res: any) => {
          const { code, msg } = res;
          if (code === 200) {
            setCommentText("");
            expandComment();
          } else {
            console.error(msg);
          }
        }
      );
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-8">
      <div className="flex justify-between items-center">
        <div className="text-lg">
          {keyword.publishDate
            ? dayjs(keyword.publishDate).format("YYYY年MM月DD日")
            : ""}
        </div>
        <Link href="/history" className="bg-gray-200 px-4 py-1 rounded">
          历史记录
        </Link>
      </div>

      <div className="flex justify-center items-center mt-32">
        <div className="text-4xl">{keyword.keywordContent}</div>
      </div>

      {showComment ? (
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <textarea
              className="w-full p-4 border rounded-lg resize-none"
              rows={4}
              placeholder="写下你的评论..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmitComment}
              >
                发布评论
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((comment: any) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex gap-3">
                  {/* 用户头像 */}
                  <div className="flex-shrink-0">
                    {comment.userAvatar ? (
                      <Image
                        src={comment.userAvatar}
                        alt={comment.userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">
                          {comment.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 评论内容区域 */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-gray-900">
                        {comment.userName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {dayjs(comment.createTime).format("YYYY-MM-DD HH:mm")}
                      </div>
                    </div>
                    <div className="text-gray-700 mt-1">{comment.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-end mt-8">
          <button onClick={expandComment}>
            <BsChatDots size={32} />
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          router.push("/profile/login");
        }}
        title="提示"
        content="请先登录"
      />
    </div>
  );
}
