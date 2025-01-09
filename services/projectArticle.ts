import apiClient from "./apiClient";

export const getProjectArticleList = (projectId: number | null) => {
  return apiClient.get("/system/projectArticle/all", {
    params: {
      projectId,
    },
  });
};

export const getProjectArticleDetail = (articleId: number) => {
  return apiClient.get(`/system/projectArticle/getDetail/${articleId}`);
};
