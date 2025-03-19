"use client";

import {
  getKeyword,
  getKeywordComment,
  postKeywordComment,
} from "@/services/keyword";
import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import dayjs from "dayjs";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getInfo } from "@/services/login";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Comment from "@/components/Comment";
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
      postKeywordComment(keyword.id, commentText, user.userId, null, null).then(
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
    <div className="flex flex-col h-full overflow-y-auto p-8 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="text-lg">今日关键词</div>
        <Link href="/history" className="bg-gray-200 px-4 py-1 rounded">
          历史记录
        </Link>
      </div>

      <div className="rounded-2xl overflow-y-auto mt-8 bg-white flex-1 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="relative h-52 flex-shrink-0">
          <img
            src="/images/home_bg.jpg"
            alt="背景图片"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 right-0 text-white p-2">
            {keyword.publishDate
              ? dayjs(keyword.publishDate).format("YYYY年MM月DD日")
              : ""}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex justify-center items-center mt-8 flex-shrink-0">
            <div className="text-5xl font-medium">{keyword.keywordContent}</div>
          </div>

          {showComment ? (
            <div className="mt-8 space-y-6 mx-4 mb-4">
              <div className="space-y-4">
                <textarea
                  className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  <Comment
                    key={comment.id}
                    comment={comment}
                    keywordId={keyword.id}
                    onReply={expandComment}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-end mt-8 mx-4 mb-4">
              <button onClick={expandComment}>
                <BsChatDots size={32} />
              </button>
            </div>
          )}
        </div>
      </div>

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
