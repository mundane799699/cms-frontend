"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import {
  getKeywordComment,
  getKeywordDetail,
  postKeywordComment,
} from "@/services/keyword";
import dayjs from "dayjs";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import Modal from "@/components/Modal";
import { BsChatDots } from "react-icons/bs";
import { NavigationHeader } from "@/components/NavigationHeader";

const KeywordPage = () => {
  const { keywordId } = useParams();
  const router = useRouter();
  const { userInfo, initialized, initialize } = useUserInfo();
  const [keyword, setKeyword] = useState({
    id: null,
    keywordContent: "",
    publishDate: "",
  });
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
    getKeywordDetail(Number(keywordId)).then((res: any) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setKeyword(data);
      } else {
        console.error(msg);
      }
    });
  }, [initialized, userInfo]);

  const expandComment = () => {
    if (!userInfo) {
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
    if (keyword.id && userInfo) {
      postKeywordComment(
        keyword.id,
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
    }
  };

  return (
    <div className="h-screen bg-white">
      <NavigationHeader />
      <div className="pt-16 px-4 pb-4">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            {keyword.publishDate
              ? dayjs(keyword.publishDate).format("YYYY年MM月DD日")
              : ""}
          </div>
        </div>

        <div className="flex justify-center items-center mt-32">
          <div className="text-4xl">{keyword.keywordContent}</div>
        </div>

        {showComment ? (
          <div className="mt-8 space-y-6">
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
    </div>
  );
};

export default KeywordPage;
