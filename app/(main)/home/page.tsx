"use client";

import {
  getKeyword,
  getKeywordComment,
  postKeywordComment,
} from "@/services/keyword";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getInfo } from "@/services/login";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Comment from "@/components/Comment";
import { MessageSquareMore } from "lucide-react";
import { BeatLoader } from "react-spinners";
interface Keyword {
  id: number;
  keywordContent: string;
  publishDate: string;
}

export default function Home() {
  const router = useRouter();
  const { userInfo, initialized, initialize } = useUserInfo();
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState<Keyword | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!initialized) {
      initialize();
      return;
    }
    if (!userInfo) {
      router.push("/login");
      return;
    }
    getKeyword().then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setKeyword(data);
      } else {
        console.error(msg);
      }
    });
  }, [userInfo, initialized]);

  const expandComment = () => {
    if (!userInfo) {
      // 弹出弹窗提示去登录
      setIsModalOpen(true);
      return;
    }

    getKeywordComment(keyword!.id).then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setComments(data);
        setShowComment(true);
      } else {
        console.error(msg);
      }
    });
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    postKeywordComment(
      keyword!.id,
      commentText,
      userInfo.userId,
      null,
      null
    ).then((res: any) => {
      const { code, msg } = res;
      if (code === 200) {
        setCommentText("");
        expandComment();
      } else {
        console.error(msg);
      }
    });
  };

  if (!keyword) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#3b82f6" size={10} />
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto bg-gray-50">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-lg">今日关键词</div>
          <Link
            href="/history"
            className="border border-gray-900 px-4 py-1 rounded-full hover:bg-gray-300 transition-colors"
          >
            历史记录
          </Link>
        </div>

        <div className="flex-1 rounded-2xl mt-8 bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          <div className="relative h-52 rounded-t-2xl overflow-hidden">
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

          <div className="h-52 flex items-center justify-center">
            <div className="text-5xl font-medium">
              {keyword?.keywordContent}
            </div>
          </div>

          {!showComment && (
            <button
              className="absolute bottom-24 right-10 m-4 text-gray-500 hover:text-gray-600 transition-colors"
              onClick={() => {
                expandComment();
                setTimeout(() => {
                  if (commentSectionRef.current) {
                    commentSectionRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }, 100);
              }}
            >
              <MessageSquareMore size={32} />
            </button>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            router.push("/login");
          }}
          title="提示"
          content="请先登录"
        />
      </div>

      {showComment && (
        <div ref={commentSectionRef} className="mt-8 space-y-6 mx-1 mb-4">
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
      )}
    </div>
  );
}
