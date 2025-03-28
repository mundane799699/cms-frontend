import apiClient from "./apiClient";

export const getArticleList = (
  categoryId: number | null,
  projectId: number | null,
  type: number
) => {
  return apiClient.get("/system/article/all", {
    params: {
      categoryId,
      projectId,
      type,
    },
  });
};

export const getArticleDetail = (articleId: number) => {
  return apiClient.get(`/system/article/getDetail/${articleId}`);
};

export const getArticleCategory = () => {
  return apiClient.get("/system/articleCategory/all");
};

export const publishArticle = (data: any) => {
  return apiClient.post("/system/article", data);
};

export const getMyPosts = () => {
  return apiClient.get("/system/article/myPosts");
};
