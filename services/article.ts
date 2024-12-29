import apiClient from "./apiClient";

export const getArticleList = () => {
  return apiClient.get("/system/article/all");
};

export const getArticleDetail = (articleId: number) => {
  return apiClient.get(`/system/article/getDetail/${articleId}`);
};
