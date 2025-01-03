import apiClient from "./apiClient";

export const getArticleList = (categoryId: number | null) => {
  return apiClient.get("/system/article/all", {
    params: {
      categoryId,
    },
  });
};

export const getArticleDetail = (articleId: number) => {
  return apiClient.get(`/system/article/getDetail/${articleId}`);
};

export const getArticleCategory = () => {
  return apiClient.get("/system/articleCategory/all");
};
