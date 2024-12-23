import apiClient from "./apiClient";

export const getKeyword = () => {
  return apiClient.get("/system/keywords/getKeyword");
};

export const getHistory = () => {
  return apiClient.get("/system/keywords/history");
};

export const getKeywordComment = (keywordId: number) => {
  return apiClient.get(`/system/comment/keyword/${keywordId}`);
};

export const postKeywordComment = (
  keywordId: number | null,
  content: string,
  userId: number,
  parentId: number | null,
  replyUserId: number | null
) => {
  return apiClient.post(`/system/comment`, {
    keywordId,
    content,
    userId,
    parentId,
    replyUserId,
  });
};

export const getKeywordDetail = (keywordId: number) => {
  return apiClient.get(`/system/keywords/getDetail/${keywordId}`);
};
