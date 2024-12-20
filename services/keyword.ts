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
  keywordId: number,
  content: string,
  userId: number,
  parentId: number | null
) => {
  return apiClient.post(`/system/comment`, {
    keywordId,
    content,
    userId,
    parentId,
  });
};
