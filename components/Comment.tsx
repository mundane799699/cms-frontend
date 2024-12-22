"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { postKeywordComment } from "@/services/keyword";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function Comment({
  comment,
  keywordId,
  onReply,
}: {
  comment: any;
  keywordId: number | null;
  onReply: () => void;
}) {
  const { userInfo } = useUserInfo();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const replyUserIdRef = useRef<number | null>(null);
  const [replyUserName, setReplyUserName] = useState("");

  const handleReply = (parentId: number) => {
    postKeywordComment(
      keywordId,
      replyContent,
      userInfo.userId,
      parentId,
      replyUserIdRef.current
    ).then((res: any) => {
      const { code, msg } = res;
      if (code === 200) {
        setReplyContent("");
        setShowReplyBox(false);
        onReply();
      } else {
        console.error(msg);
      }
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
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
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-900">{comment.userName}</div>
          </div>

          <div className="text-gray-700 mt-1">{comment.content}</div>
          <div className="flex gap-4 mt-1 items-center text-gray-500 text-xs">
            <div>{dayjs(comment.createTime).format("YYYY-MM-DD HH:mm")}</div>
            <button
              onClick={() => {
                replyUserIdRef.current = null;
                setReplyUserName("");
                setShowReplyBox(!showReplyBox);
              }}
              className="hover:text-blue-500"
            >
              回复
            </button>
          </div>
          {/* 子评论 */}
          {comment.children && comment.children.length > 0 && (
            <div className="mt-2">
              {comment.children.map((child: any) => (
                <div key={child.id} className="bg-gray-50 rounded-lg py-2">
                  <div className="flex gap-3">
                    {/* 用户头像 */}
                    <div className="flex-shrink-0">
                      {child.userAvatar ? (
                        <Image
                          src={child.userAvatar}
                          alt={child.userName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-lg">
                            {child.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 评论内容区域 */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900">
                          {child.replyUserName
                            ? `${child.userName} 回复 ${child.replyUserName}`
                            : child.userName}
                        </div>
                      </div>

                      <div className="text-gray-700 mt-1">{child.content}</div>
                      <div className="flex gap-4 mt-1 items-center text-gray-500 text-xs">
                        <div>
                          {dayjs(child.createTime).format("YYYY-MM-DD HH:mm")}
                        </div>
                        <button
                          onClick={() => {
                            if (showReplyBox) {
                              setShowReplyBox(false);
                              setReplyUserName("");
                            } else {
                              replyUserIdRef.current = child.userId;
                              setShowReplyBox(true);
                              setReplyUserName(child.userName);
                            }
                          }}
                          className="hover:text-blue-500"
                        >
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* 添加回复框 */}
          {showReplyBox && (
            <div className="mt-3">
              <textarea
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                placeholder={`回复${replyUserName}：`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowReplyBox(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  取消
                </button>
                <button
                  onClick={() => handleReply(comment.id)}
                  className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                >
                  发布
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
